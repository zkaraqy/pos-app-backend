import { Hono } from 'hono';
import { sValidator } from '@hono/standard-validator';
import {
    getAllCategories,
    getCategoriesQuerySchema,
} from '../controllers/category.controller.js';

const categoryRoutes = new Hono();

categoryRoutes.get('/', sValidator('query', getCategoriesQuerySchema), getAllCategories);

export default categoryRoutes;