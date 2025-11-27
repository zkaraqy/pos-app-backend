import { Hono } from 'hono';
import { sValidator } from '@hono/standard-validator';
import * as productController from '../controllers/product.controller.js';
import {
    getProductsQuerySchema,
    getProductByIdParamSchema,
} from '../controllers/product.controller.js';

const productRoutes = new Hono();

productRoutes.get('/', sValidator('query', getProductsQuerySchema), productController.getAllProducts);
productRoutes.get('/:id', sValidator('param', getProductByIdParamSchema), productController.getProductById);

export default productRoutes;
