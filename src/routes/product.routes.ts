import { Hono } from 'hono';
import { sValidator } from '@hono/standard-validator';
import * as productController from '../controllers/product.controller.js';
import {
    getProductsQuerySchema,
    getProductByIdParamSchema,
    updateStockSchema,
} from '../controllers/product.controller.js';

const productRoutes = new Hono();

productRoutes.get('/', sValidator('query', getProductsQuerySchema), productController.getAllProducts);
productRoutes.get('/:id', sValidator('param', getProductByIdParamSchema), productController.getProductById);
productRoutes.post('/', sValidator('json', productController.productBodySchema), productController.createProduct);
productRoutes.put('/:id', sValidator('param', getProductByIdParamSchema), sValidator('json', productController.productBodySchema), productController.updateProductById);
productRoutes.put('/:id/stock', sValidator('param', getProductByIdParamSchema), sValidator('json', updateStockSchema), productController.updateProductStock);
productRoutes.delete('/:id', sValidator('param', getProductByIdParamSchema), productController.deleteProductById);
productRoutes.put('/:id/varian', sValidator('param', getProductByIdParamSchema), productController.updateProductVariantsById);

export default productRoutes;
