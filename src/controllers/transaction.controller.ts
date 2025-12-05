import type { Context } from 'hono';
import { Transaction, TransactionDetail } from '../database/models/index.js';
import { successResponse, errorResponse, notFoundResponse } from '../utils/response.util.js';
import { generateTransactionRef } from '../utils/transaction.util.js';
import { sequelize } from '../database/index.js';
import { z } from 'zod';

export const getTransactionsQuerySchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    rowsPerPage: z.string().optional().transform(val => val ? parseInt(val) : 10),
    status: z.enum(['waiting_payment', 'canceled', 'completed']).optional(),
});

export const getTransactionByIdParamSchema = z.object({
    id: z.string().min(1),
});

export const createTransactionSchema = z.object({
    id_cashier: z.number().positive(),
    type: z.enum(['makan_ditempat', 'bawa_pulang']),
    table_number: z.number().nullable().optional(),
    customer_name: z.string().nullable().optional(),
    customer_email: z.string().email().nullable().optional(),
    payment_method: z.enum(['qris', 'cash']),
    status: z.enum(['waiting_payment', 'canceled', 'completed']).optional(),
    ref: z.string().optional(),
    items: z.array(
        z.object({
            id_product: z.number().positive().nullable().optional(),
            id_product_varian: z.number().positive().nullable().optional(),
            price: z.number().positive(),
            quantity: z.number().positive(),
        })
    ).min(1),
});

export const bulkCreateTransactionsSchema = z.object({
    transactions: z.array(createTransactionSchema).min(1),
});

export const updateTransactionSchema = z.object({
    status: z.enum(['waiting_payment', 'canceled', 'completed']).optional(),
    table_number: z.number().nullable().optional(),
    customer_name: z.string().nullable().optional(),
    customer_email: z.string().email().nullable().optional(),
    payment_method: z.enum(['qris', 'cash']).optional(),
});

export const getAllTransactions = async (c: Context) => {
    try {
        const query = c.req.query();
        const page = query.page ? parseInt(query.page) : 1;
        const rowsPerPage = query.rowsPerPage ? parseInt(query.rowsPerPage) : undefined;
        const offset = rowsPerPage ? (page - 1) * rowsPerPage : undefined;

        const whereClause: any = {};
        if (query.status) {
            whereClause.status = query.status;
        }

        const { count, rows: transactions } = await Transaction.findAndCountAll({
            where: whereClause,
            include: [
                {
                    association: Transaction.associations.user,
                    attributes: ['id', 'name', 'email', 'role'],
                },
                {
                    association: Transaction.associations.transactionDetails,
                    include: [
                        {
                            association: TransactionDetail.associations.product,
                            attributes: ['id', 'name', 'price'],
                        },
                        {
                            association: TransactionDetail.associations.productVarian,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                }
            ],
            order: [['created_at', 'DESC']],
            limit: rowsPerPage,
            offset,
        });

        const totalPages = Math.ceil(count / (rowsPerPage || count));

        return successResponse(
            c,
            transactions,
            'Transactions retrieved successfully',
            200,
            {
                page,
                rowsPerPage,
                total: count,
                totalPages,
            }
        );
    } catch (error) {
        return errorResponse(c, 'Failed to retrieve transactions', error);
    }
};

export const getTransactionById = async (c: Context) => {
    try {
        const id = c.req.param('id');

        const transaction = await Transaction.findByPk(id, {
            include: [
                {
                    association: Transaction.associations.user,
                    attributes: ['id', 'name', 'email', 'role'],
                },
                {
                    association: Transaction.associations.transactionDetails,
                    include: [
                        {
                            association: TransactionDetail.associations.product,
                            attributes: ['id', 'name', 'price'],
                        },
                        {
                            association: TransactionDetail.associations.productVarian,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
            ],
        });

        if (!transaction) {
            return notFoundResponse(c, 'Transaction');
        }

        return successResponse(c, transaction, 'Transaction retrieved successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to retrieve transaction', error);
    }
};

export const createTransaction = async (c: Context) => {
    const t = await sequelize.transaction();

    try {
        const body = await c.req.json();

        const ref = body.ref || generateTransactionRef();

        const transaction = await Transaction.create(
            {
                idCashier: body.id_cashier,
                ref,
                type: body.type,
                tableNumber: body.table_number || null,
                customerName: body.customer_name || null,
                customerEmail: body.customer_email || null,
                paymentMethod: body.payment_method,
                status: body.status || 'waiting_payment',
                transactionStatus: 'waiting'
            },
            { transaction: t }
        );

        const details = body.items.map((item: any) => ({
            idTransaction: transaction.id,
            idProduct: item.id_product || null,
            idProductVarian: item.id_product_varian || null,
            price: item.price,
            quantity: item.quantity,
        }));

        await TransactionDetail.bulkCreate(details, { transaction: t });

        await t.commit();

        const createdTransaction = await Transaction.findByPk(transaction.id, {
            include: [
                {
                    association: Transaction.associations.user,
                    attributes: ['id', 'name', 'email', 'role'],
                },
                {
                    association: Transaction.associations.transactionDetails,
                    include: [
                        {
                            association: TransactionDetail.associations.product,
                            attributes: ['id', 'name', 'price'],
                        },
                        {
                            association: TransactionDetail.associations.productVarian,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
            ],
        });

        return successResponse(c, createdTransaction, 'Transaction created successfully', 201);
    } catch (error) {
        await t.rollback();
        return errorResponse(c, 'Failed to create transaction', error);
    }
};

export const bulkCreateTransactions = async (c: Context) => {
    try {
        const body = await c.req.json();

        const results: {
            success: Array<{ ref: string; id: number }>;
            failed: Array<{ ref: string; error: string }>;
        } = {
            success: [],
            failed: [],
        };

        for (const transactionData of body.transactions) {
            const t = await sequelize.transaction();

            try {
                const ref = transactionData.ref || generateTransactionRef();

                const existingTransaction = await Transaction.findOne({
                    where: { ref },
                });

                if (existingTransaction) {
                    results.failed.push({
                        ref,
                        error: 'Transaction with this reference already exists',
                    });
                    await t.rollback();
                    continue;
                }

                const transaction = await Transaction.create(
                    {
                        idCashier: transactionData.id_cashier,
                        ref,
                        type: transactionData.type,
                        tableNumber: transactionData.table_number || null,
                        customerName: transactionData.customer_name || null,
                        customerEmail: transactionData.customer_email || null,
                        paymentMethod: transactionData.payment_method,
                        status: transactionData.status || 'waiting_payment',
                        transactionStatus: 'waiting'
                    },
                    { transaction: t }
                );

                const details = transactionData.items.map((item: any) => ({
                    idTransaction: transaction.id,
                    idProduct: item.id_product || null,
                    idProductVarian: item.id_product_varian || null,
                    price: item.price,
                    quantity: item.quantity,
                }));

                await TransactionDetail.bulkCreate(details, { transaction: t });

                await t.commit();

                results.success.push({
                    ref,
                    id: transaction.id,
                });
            } catch (error) {
                await t.rollback();
                results.failed.push({
                    ref: transactionData.ref || 'unknown',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        }

        return successResponse(
            c,
            {
                total: body.transactions.length,
                successful: results.success.length,
                failed: results.failed.length,
                results,
            },
            'Bulk transaction processing completed',
            201
        );
    } catch (error) {
        return errorResponse(c, 'Failed to process bulk transactions', error);
    }
};

export const updateTransaction = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();

        const transaction = await Transaction.findByPk(id);

        if (!transaction) {
            return notFoundResponse(c, 'Transaction');
        }

        const allowedUpdates: any = {};

        if (body.status) {
            allowedUpdates.status = body.status;
        }

        if (body.table_number !== undefined) {
            allowedUpdates.tableNumber = body.table_number;
        }

        if (body.customer_name !== undefined) {
            allowedUpdates.customerName = body.customer_name;
        }

        if (body.customer_email !== undefined) {
            allowedUpdates.customerEmail = body.customer_email;
        }

        if (body.payment_method) {
            allowedUpdates.paymentMethod = body.payment_method;
        }

        await transaction.update(allowedUpdates);

        const updatedTransaction = await Transaction.findByPk(id, {
            include: [
                {
                    association: Transaction.associations.user,
                    attributes: ['id', 'name', 'email', 'role'],
                },
                {
                    association: Transaction.associations.transactionDetails,
                    include: [
                        {
                            association: TransactionDetail.associations.product,
                            attributes: ['id', 'name', 'price'],
                        },
                        {
                            association: TransactionDetail.associations.productVarian,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                }
            ],
        });

        return successResponse(c, updatedTransaction, 'Transaction updated successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to update transaction', error);
    }
};

export const deleteTransaction = async (c: Context) => {
    const t = await sequelize.transaction();
    try {
        const id = c.req.param('id');
        const transaction = await Transaction.findByPk(id);

        if (!transaction) {
            return notFoundResponse(c, 'Transaction');
        }
        await TransactionDetail.destroy({ where: { idTransaction: id }, transaction: t });
        await transaction.destroy({ transaction: t });
        await t.commit();

        return successResponse(c, null, 'Transaction deleted successfully', 200);
    } catch (error) {
        await t.rollback();
        return errorResponse(c, 'Failed to delete transaction', error);
    }
};
