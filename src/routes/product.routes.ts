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
productRoutes.put('/:id', sValidator('param', getProductByIdParamSchema), sValidator('json', productController.updateProductByIdBodySchema), productController.updateProductById);

export default productRoutes;
