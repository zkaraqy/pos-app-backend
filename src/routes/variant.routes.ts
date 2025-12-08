import { Hono } from 'hono';
import { sValidator } from '@hono/standard-validator';
import { updateVariantStock } from '../controllers/product.controller.js';
import { getProductByIdParamSchema, updateStockSchema } from '../controllers/product.controller.js';

const variantRoutes = new Hono();

variantRoutes.put('/:id/stock', sValidator('param', getProductByIdParamSchema), sValidator('json', updateStockSchema), updateVariantStock);

export default variantRoutes;
