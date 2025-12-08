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

export const productBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    price: z.number().nullable().optional(),
    stock: z.number().optional(),
    isActive: z.boolean().optional(),
    id_category: z.number().optional(),
});

export const updateStockSchema = z.object({
    quantity: z.number().int(),
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

export const createProduct = async (c: Context) => {
    try {
        const productData = await c.req.json();
        const newProduct = await Product.create(productData);
        console.log({ productData, newProduct });
        await ProductCategory.create({
            idProduct: newProduct.dataValues.id,
            idCategory: productData.id_category
        });
        return successResponse(c, newProduct, 'Product created successfully', 201);
    } catch (error) {
        return errorResponse(c, 'Failed to create product', error);
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

        const { id_category, ...productUpdateData } = productData;
        await product.update(productUpdateData);

        if (id_category !== undefined) {
            const existingCategory = await ProductCategory.findOne({ where: { idProduct: id } });

            if (existingCategory) {
                await existingCategory.update({ idCategory: id_category });
            } else {
                await ProductCategory.create({
                    idProduct: parseInt(id),
                    idCategory: id_category
                });
            }
        }

        const updatedProduct = await Product.findByPk(id, {
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

        return successResponse(c, updatedProduct, 'Product updated successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to update product', error);
    }
};

export const deleteProductById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const product = await Product.findByPk(id);
        if (!product) {
            return notFoundResponse(c, 'Product');
        }
        const productVariants = await ProductVarian.findAll({ where: { idProduct: id } });
        for (const variant of productVariants) {
            await variant.destroy();
        }
        const productCategories = await ProductCategory.findAll({ where: { idProduct: id } });
        for (const prodCat of productCategories) {
            await prodCat.destroy();
        }
        await product.destroy();
        return successResponse(c, null, 'Product deleted successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to delete product', error);
    }
};

export const updateProductVariantsById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const variantsData = await c.req.json();
        const product = await Product.findByPk(id, {
            include: [
                {
                    association: Product.associations.productVarians,
                }
            ],
        });
        if (!product) {
            return notFoundResponse(c, 'Product');
        }
        const existingVariants = product.productVarians || [];

        for (const variantData of variantsData) {
            if (variantData.id) {
                const existingVariant = existingVariants.find(v => v.id === variantData.id);
                if (existingVariant) {
                    await existingVariant.update(variantData);
                }
            } else {
                await ProductVarian.create({ ...variantData, productId: product.id });
            }
        }
        return successResponse(c, null, 'Product variants updated successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to update product variants', error);
    }
};

export const updateProductStock = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const { quantity } = await c.req.json();

        const product = await Product.findByPk(id);

        if (!product) {
            return notFoundResponse(c, 'Product');
        }

        const newStock = product.stock + quantity;

        if (newStock < 0) {
            return errorResponse(c, 'Insufficient stock', { currentStock: product.stock, requestedChange: quantity }, 400);
        }

        await product.update({ stock: newStock });

        return successResponse(c, { 
            id: product.id, 
            name: product.name,
            previousStock: product.stock - quantity,
            newStock: product.stock,
            quantityChange: quantity
        }, 'Product stock updated successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to update product stock', error);
    }
};

export const updateVariantStock = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const { quantity } = await c.req.json();

        const variant = await ProductVarian.findByPk(id);

        if (!variant) {
            return notFoundResponse(c, 'Product variant');
        }

        const newStock = variant.stock + quantity;

        if (newStock < 0) {
            return errorResponse(c, 'Insufficient stock', { currentStock: variant.stock, requestedChange: quantity }, 400);
        }

        await variant.update({ stock: newStock });

        return successResponse(c, { 
            id: variant.id, 
            name: variant.name,
            previousStock: variant.stock - quantity,
            newStock: variant.stock,
            quantityChange: quantity
        }, 'Variant stock updated successfully');
    } catch (error) {
        return errorResponse(c, 'Failed to update variant stock', error);
    }
};
