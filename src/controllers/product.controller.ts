import type { Context } from 'hono';
import { Product, ProductVarian, ProductCategory } from '../database/models/index.js';
import { successResponse, errorResponse, notFoundResponse } from '../utils/response.util.js';
import { z } from 'zod';
import { Op } from 'sequelize';

export const getProductsQuerySchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    rowsPerPage: z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: z.string().optional(),
});

export const getProductByIdParamSchema = z.object({
    id: z.string().min(1),
});

export const updateProductByIdBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    price: z.number().nullable().optional(),
    stock: z.number().optional(),
    isActive: z.boolean().optional(),
});

export const getAllProducts = async (c: Context) => {
    try {
        const query = c.req.query();
        const page = Number(query.page) || 1;
        const rowsPerPage = Number(query.rowsPerPage) || undefined;
        const offset = rowsPerPage ? (page - 1) * rowsPerPage : undefined;

        const whereClause: any = {};
        if (query.search) {
            whereClause.name = { [Op.like]: `%${query.search}%` };
        }

        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            include: [
                {
                    association: Product.associations.productCategories,
                    include: [
                        {
                            association: ProductCategory.associations.category,
                        }
                    ]
                },
                {
                    association: Product.associations.productVarians,
                    include: [
                        {
                            association: ProductVarian.associations.images,
                        }
                    ]
                },
                {
                    association: Product.associations.images,
                },
            ],
            order: [['id', 'ASC']],
            limit: rowsPerPage,
            offset: offset,
            distinct: true,
        });

        const totalPages = Math.ceil(count / (rowsPerPage || count));

        return successResponse(
            c,
            products,
            'Products retrieved successfully',
            200,
            {
                page,
                rowsPerPage,
                total: count,
                totalPages,
            }
        );
    } catch (error) {
        return errorResponse(c, 'Failed to retrieve products', error);
    }
};

export const getProductById = async (c: Context) => {
    try {
        const id = c.req.param('id');

        const product = await Product.findByPk(id, {
            include: [
                {
                    association: Product.associations.productCategories,
                    include: [
                        {
                            association: ProductCategory.associations.category,
                        }
                    ]
                },
                {
                    association: Product.associations.productVarians,
                    include: [
                        {
                            association: ProductVarian.associations.images,
                        }
                    ]
                },
                {
                    association: Product.associations.images,
                },
            ],
        });

        if (!product) {
            return notFoundResponse(c, 'Product');
        }

        return successResponse(c, product, 'Product retrieved successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to retrieve product', error);
    }
};

export const updateProductById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const productData = await c.req.json();
        const product = await Product.findByPk(id);

        if (!product) {
            return notFoundResponse(c, 'Product');
        }
        await product.update(productData);

        return successResponse(c, product, 'Product updated successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to update product', error);
    }
};