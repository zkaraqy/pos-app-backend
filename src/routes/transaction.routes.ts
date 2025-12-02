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
import { verifyAuthentication } from '../middleware.js';

const transactionRoutes = new Hono();

transactionRoutes.get('/', verifyAuthentication, sValidator('query', getTransactionsQuerySchema), transactionController.getAllTransactions);
transactionRoutes.get('/:id', verifyAuthentication, sValidator('param', getTransactionByIdParamSchema), transactionController.getTransactionById);
transactionRoutes.post('/', verifyAuthentication, sValidator('json', createTransactionSchema), transactionController.createTransaction);
transactionRoutes.post('/bulk', verifyAuthentication, sValidator('json', bulkCreateTransactionsSchema), transactionController.bulkCreateTransactions);
transactionRoutes.put('/:id', verifyAuthentication, sValidator('param', getTransactionByIdParamSchema), sValidator('json', updateTransactionSchema), transactionController.updateTransaction);
transactionRoutes.delete('/:id', verifyAuthentication, sValidator('param', getTransactionByIdParamSchema), transactionController.deleteTransaction);

export default transactionRoutes;
