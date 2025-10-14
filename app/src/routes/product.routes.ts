// app/src/routes/product.routes.ts

/**
 * Product Routes
 * --------------
 * This file defines the HTTP routes related to the `Product` entity.
 * 
 * Available Endpoints:
 *  - `POST /products/` : Create a new product.
 *  - `GET /products/`  : Get all registered products.
 *  - `GET /products/:id_product` : Get a product by its ID.
 *  - `PUT /products/:id_product` : Update a product by its ID.
 *  - `DELETE /products/:id_product` : Soft delete a product by its ID.
 * 
 * Each route is connected to its respective controller.
 */

import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, softDeleteProduct } from "../controllers/product.controller";

const router = Router();

/**
 * POST /
 * -----
 * Creates a new product in the database.
 * 
 * Request Body:
 *  - `category_id`: number (required)
 *  - `name`: string (required)
 *  - `price`: number (required)
 *  - `description`: string (optional)
 *  - `stock`: number (required)
 * 
 * Response:
 *  - 201 Created: Returns the created product in JSON format.
 *  - 500 Internal Server Error: If an error occurs during creation.
 * 
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
 *             type: object
 *             required:
 *               - category_id
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               category_id:
 *                 type: number
 *                 example: 2
 *               name:
 *                 type: string
 *                 example: "Apple"
 *               price:
 *                 type: number
 *                 example: 1.5
 *               description:
 *                 type: string
 *                 example: "Fresh red apple"
 *               stock:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               category_id: 2
 *               name: "Apple"
 *               price: 1.5
 *               description: "Fresh red apple"
 *               stock: 100
 *               is_active: true
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to create product"
 */
router.post("/", createProduct);

/**
 * GET /
 * ----
 * Retrieves the complete list of products from the database.
 * 
 * Response:
 *  - 200 OK: Returns an array of products in JSON format.
 * 
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 category_id: 2
 *                 name: "Apple"
 *                 price: 1.5
 *                 description: "Fresh red apple"
 *                 stock: 100
 *                 is_active: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to retrieve products"
 */
router.get("/", getProducts);

/**
 * GET /:id_product
 * ----------------
 * Retrieves a single product by its ID.
 * 
 * Response:
 *  - 200 OK: Returns the product in JSON format.
 *  - 404 Not Found: If the product does not exist.
 * 
 * @swagger
 * /products/{id_product}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               category_id: 2
 *               name: "Apple"
 *               price: 1.5
 *               description: "Fresh red apple"
 *               stock: 100
 *               is_active: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Product not found"
 *       500:
 *         description: Internal server error
 */
router.get("/:id_product", getProductById);

/**
 * PUT /:id_product
 * ----------------
 * Updates a product by its ID.
 * 
 * Request Body:
 *  - `category_id`: number (optional)
 *  - `name`: string (optional)
 *  - `price`: number (optional)
 *  - `description`: string (optional)
 *  - `stock`: number (optional)
 * 
 * Response:
 *  - 200 OK: Returns the updated product.
 *  - 404 Not Found: If the product does not exist.
 * 
 * @swagger
 * /products/{id_product}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Apple"
 *               price:
 *                 type: number
 *                 example: 2.0
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               stock:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               category_id: 2
 *               name: "Updated Apple"
 *               price: 2.0
 *               description: "Updated description"
 *               stock: 150
 *               is_active: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Product not found"
 *       500:
 *         description: Internal server error
 */
router.put("/:id_product", updateProduct);

/**
 * DELETE /:id_product
 * -------------------
 * Soft deletes a product by its ID (marks it as inactive instead of deleting it permanently).
 * 
 * Response:
 *  - 200 OK: Returns a success message.
 *  - 404 Not Found: If the product does not exist.
 * 
 * @swagger
 * /products/{id_product}:
 *   delete:
 *     summary: Soft delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product soft deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product soft deleted successfully"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Product not found"
 *       500:
 *         description: Internal server error
 */
router.delete("/:id_product", softDeleteProduct);

export default router;