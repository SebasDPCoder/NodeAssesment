// app/src/controllers/product.controller.ts

/**
 * Product Controller
 * ------------------
 * This file contains the controllers that handle requests
 * related to the `Product` entity.
 *
 * Pattern used:
 *  - DTO (Data Transfer Object): To type input data.
 *  - DAO (Data Access Object): To abstract database interaction.
 *
 * Defined controllers:
 *  - createProduct: Creates a new product in the database.
 *  - getProducts: Retrieves the list of all products.
 *  - getProductById: Retrieves a product by its ID.
 *  - updateProduct: Updates an existing product.
 *  - softDeleteProduct: Performs a soft delete of a product.
 */

import { Request, Response } from "express";
import * as productDao from "../dao/product.dao";
import { CreateProductDto } from "../dto/product.dto";

/**
 * Creates a new product in the system.
 *
 * @param req - HTTP request object, expected to contain product data in the body ({ category_id, name, price, description, stock }).
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the created product in JSON format with status code 201.
 *
 * @example
 * POST /api/products
 * {
 *   "category_id": 2,
 *   "name": "Apple",
 *   "price": 1.5,
 *   "description": "Fresh red apple",
 *   "stock": 100
 * }
 */
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const dto: CreateProductDto = req.body;
        const product = await productDao.createProduct(dto);
        return res.status(201).json(product);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Retrieves all registered products from the database.
 *
 * @param _req - HTTP request object (not used in this case).
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns an array of all products in JSON format.
 *
 * @example
 * GET /api/products
 */
export const getProducts = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const products = await productDao.getProducts();
        return res.json(products);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Retrieves a single product by its ID.
 *
 * @param req - HTTP request object, expected to contain `id_product` as a route parameter.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the product in JSON format, or 404 if not found.
 *
 * @example
 * GET /api/products/1
 */
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_product = parseInt(req.params.id_product, 10);
        const product = await productDao.getProductById(id_product);
        if (product) {
            return res.json(product);
        }
        return res.status(404).json({ error: "Product not found" });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Updates an existing product by its ID.
 *
 * @param req - HTTP request object, expected to contain `id_product` as a route parameter and update data in the body.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the updated product in JSON format, or 404 if not found.
 *
 * @example
 * PUT /api/products/1
 * {
 *   "name": "Updated Apple",
 *   "price": 2.0,
 *   "stock": 150
 * }
 */
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_product = parseInt(req.params.id_product, 10);
        const dto = req.body;
        const updatedProduct = await productDao.updateProduct(id_product, dto);
        if (updatedProduct) {
            return res.json(updatedProduct);
        }
        return res.status(404).json({ error: "Product not found" });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Soft deletes a product by its ID (marks it as inactive instead of permanently deleting it).
 *
 * @param req - HTTP request object, expected to contain `id_product` as a route parameter.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns a success message, or 404 if the product does not exist.
 *
 * @example
 * DELETE /api/products/1
 */
export const softDeleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_product = parseInt(req.params.id_product, 10);
        const deleted = await productDao.softDeleteProduct(id_product);
        if (deleted) {
            return res.json({ message: "Product deleted successfully" });
        }
        return res.status(404).json({ error: "Product not found" });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};