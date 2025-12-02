import { Hono } from 'hono';
import { sValidator } from '@hono/standard-validator';
import * as productController from '../controllers/product.controller.js';
import {
    getProductsQuerySchema,
    getProductByIdParamSchema,
} from '../controllers/product.controller.js';
import { verifyAuthentication } from '../middleware.js';

const productRoutes = new Hono();

productRoutes.get('/', verifyAuthentication, sValidator('query', getProductsQuerySchema), productController.getAllProducts);
productRoutes.get('/:id', verifyAuthentication, sValidator('param', getProductByIdParamSchema), productController.getProductById);
productRoutes.put('/:id', verifyAuthentication, sValidator('param', getProductByIdParamSchema), productController.updateProductById);

export default productRoutes;
