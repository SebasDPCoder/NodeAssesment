// app/src/routes/product.routes.ts

/**
 * Product Routes
 * --------------
 * This file defines all HTTP routes for managing products.
 *
 * Updated:
 *  - Routes now use the `code` (string) field instead of numeric `id_product`.
 */

import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductByCode,
  updateProduct,
  softDeleteProduct,
} from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.midleware";
import { requireRoleByName } from "../middleware/rbac.guard";

const router = Router();
// --- POST ---
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDto'
 *           example:
 *             code: "APL-001"
 *             name: "Apple"
 *             description: "Fresh red apple"
 *             price: 1.5
 *             stock: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product created successfully"
 *               data:
 *                 id_product: 1
 *                 code: "APL-001"
 *                 name: "Apple"
 *                 description: "Fresh red apple"
 *                 price: 1.5
 *                 stock: 100
 *                 is_active: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Validation error"
 *               errors:
 *                 name: "Product name is required"
 *       409:
 *         description: Product already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product with code 'APL-001' already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error during creation"
 */
router.post("/", authMiddleware(), requireRoleByName('Admin'), createProduct);


// --- GET all ---
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (active and inactive)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Products retrieved successfully"
 *               data:
 *                 - id_product: 1
 *                   code: "APL-001"
 *                   name: "Apple"
 *                   description: "Fresh red apple"
 *                   price: 1.5
 *                   stock: 100
 *                   is_active: true
 *                 - id_product: 2
 *                   code: "BAN-002"
 *                   name: "Banana"
 *                   description: "Ripe yellow banana"
 *                   price: 1.0
 *                   stock: 80
 *                   is_active: false
 *       500:
 *         description: Failed to retrieve products
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while retrieving products"
 */
router.get("/", authMiddleware(), requireRoleByName('Admin', 'Analyst'), getProducts);


// --- GET by CODE ---
/**
 * @swagger
 * /products/code/{code}:
 *   get:
 *     summary: Get a product by its unique code
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Product code
 *     responses:
 *       200:
 *         description: Product found successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product retrieved successfully"
 *               data:
 *                 id_product: 1
 *                 code: "APL-001"
 *                 name: "Apple"
 *                 description: "Fresh red apple"
 *                 price: 1.5
 *                 stock: 100
 *                 is_active: true
 *       400:
 *         description: Invalid product code
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product code must be a string"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product with code 'XYZ-999' not found"
 *       500:
 *         description: Failed to retrieve product
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while retrieving product"
 */
router.get("/code/:code", authMiddleware(), requireRoleByName('Admin', 'Analyst'), getProductByCode);


// --- UPDATE ---
/**
 * @swagger
 * /products/code/{code}:
 *   put:
 *     summary: Update a product by its code
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Product code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDto'
 *           example:
 *             name: "Green Apple"
 *             price: 2.0
 *             stock: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product updated successfully"
 *               data:
 *                 code: "APL-001"
 *                 name: "Green Apple"
 *                 price: 2.0
 *                 stock: 150
 *                 is_active: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid price value"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product with code 'APL-001' not found"
 *       500:
 *         description: Failed to update product
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while updating product"
 */
router.put("/code/:code", authMiddleware(), requireRoleByName('Admin'), updateProduct);


// --- DELETE ---
/**
 * @swagger
 * /products/code/{code}:
 *   delete:
 *     summary: Soft delete a product (set is_active=false)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Product code
 *     responses:
 *       204:
 *         description: Product soft-deleted successfully
 *       404:
 *         description: Product not found or already inactive
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product with code 'APL-001' not found or already inactive"
 *       500:
 *         description: Failed to soft delete product
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while deleting product"
 */
router.delete("/code/:code", authMiddleware(), requireRoleByName('Admin'), softDeleteProduct);

export default router;
