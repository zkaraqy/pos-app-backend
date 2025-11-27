import { Hono } from 'hono';
import { sValidator } from '@hono/standard-validator';
import * as transactionController from '../controllers/transaction.controller.js';
import {
    getTransactionsQuerySchema,
    getTransactionByIdParamSchema,
    createTransactionSchema,
    bulkCreateTransactionsSchema,
    updateTransactionSchema,
} from '../controllers/transaction.controller.js';

const transactionRoutes = new Hono();

transactionRoutes.get('/', sValidator('query', getTransactionsQuerySchema), transactionController.getAllTransactions);
transactionRoutes.get('/:id', sValidator('param', getTransactionByIdParamSchema), transactionController.getTransactionById);
transactionRoutes.post('/', sValidator('json', createTransactionSchema), transactionController.createTransaction);
transactionRoutes.post('/bulk', sValidator('json', bulkCreateTransactionsSchema), transactionController.bulkCreateTransactions);
transactionRoutes.put('/:id', sValidator('param', getTransactionByIdParamSchema), sValidator('json', updateTransactionSchema), transactionController.updateTransaction);

export default transactionRoutes;
