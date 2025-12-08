import type { Context } from 'hono';
import { Category } from '../database/models/index.js';
import { successResponse, errorResponse, notFoundResponse } from '../utils/response.util.js';
import { z } from 'zod';
import { Op } from 'sequelize';

export const getCategoriesQuerySchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    rowsPerPage: z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: z.string().optional(),
});

export const getAllCategories = async (c: Context) => {
    try {
        const query = c.req.query();
        const page = Number(query.page) || 1;
        const rowsPerPage = Number(query.rowsPerPage) || undefined;
        const offset = rowsPerPage ? (page - 1) * rowsPerPage : undefined;
        const whereClause: any = {};
        if (query.search) {
            whereClause.name = { [Op.like]: `%${query.search}%` };
        }
        const { count, rows: categories } = await Category.findAndCountAll({
            where: whereClause,
            order: [['id', 'ASC']],
            limit: rowsPerPage,
            offset: offset,
        });
        return successResponse(c, categories, 'Categories retrieved successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to retrieve categories', error);
    }
};