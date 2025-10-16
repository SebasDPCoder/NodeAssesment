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

const router = Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Protected (Admin)
 *
 * @example
 * POST /api/products
 * {
 *   "code": "APL-001",
 *   "name": "Apple",
 *   "price": 1.5,
 *   "description": "Fresh red apple",
 *   "stock": 100
 * }
 */
router.post("/", createProduct);

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public or Protected (depending on middleware)
 */
router.get("/", getProducts);

/**
 * @route GET /api/products/code/:code
 * @desc Get a single product by its unique code
 * @access Public or Protected (depending on middleware)
 *
 * @example
 * GET /api/products/code/APL-001
 */
router.get("/code/:code", getProductByCode);

/**
 * @route PUT /api/products/code/:code
 * @desc Update a product by its code
 * @access Protected (Admin)
 *
 * @example
 * PUT /api/products/code/APL-001
 * {
 *   "price": 2.0,
 *   "stock": 150
 * }
 */
router.put("/code/:code", updateProduct);

/**
 * @route DELETE /api/products/code/:code
 * @desc Soft delete a product by its code
 * @access Protected (Admin)
 *
 * @example
 * DELETE /api/products/code/APL-001
 */
router.delete("/code/:code", softDeleteProduct);

export default router;
