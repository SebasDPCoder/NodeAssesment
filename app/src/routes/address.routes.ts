/**
 * Address Routes
 * --------------------
 * This file defines all address-related routes.
 *
 * RESTful endpoints:
 *  - POST   /addresses        : Create a new address
 *  - GET    /addresses/active : Get all active addresses
 *  - GET    /addresses/{id}   : Get address by id (active or inactive)
 *  - PATCH  /addresses/{id}   : Update an address
 *  - DELETE /addresses/{id}   : Soft delete (set is_active = false)
 */

import { Router } from 'express';
import {
  createAddress,
  getActiveAddress,
  getAddressById,
  updateAddress,
  softDeleteAddress,
} from '../controllers/address.controller';
import { authMiddleware } from '../middleware/auth.midleware';
import { requireRoleByName } from '../middleware/rbac.guard';

const router = Router();

/**
 * @swagger
 * /address:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAddressDto'
 *           example:
 *             country: "Colombia"
 *             department: "Atlántico"
 *             city: "Barranquilla"
 *             postal_code: "080001"
 *             street: "Calle 72"
 *             number: "53-80"
 *             is_active: true
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       400:
 *         description: Validation error / missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Failed to create address, required fields are missing."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Failed to create address"
 */
router.post('/', authMiddleware(), requireRoleByName('Admin','Seller'),createAddress);

/**
 * @swagger
 * /address/active:
 *   get:
 *     summary: Get all active addresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: Active addresses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddressResponseDto'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Failed to retrieve active addresses."
 */
router.get('/active', authMiddleware(), requireRoleByName('Admin','Seller'), getActiveAddress);

/**
 * @swagger
 * /address/{id}:
 *   get:
 *     summary: Get an address by ID (active or inactive)
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       400:
 *         description: Invalid address ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Invalid address ID."
 *       404:
 *         description: Address not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Address not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Failed to retrieve address."
 */
router.get('/:id', authMiddleware(),  requireRoleByName('Admin','Seller'), getAddressById);

/**
 * @swagger
 * /address/{id}:
 *   patch:
 *     summary: Update an address by ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAddressDto'
 *           example:
 *             city: "Soledad"
 *             street: "Calle 30"
 *             number: "21-05"
 *             is_active: true
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       400:
 *         description: Invalid ID or empty update payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             examples:
 *               invalidId:
 *                 value:
 *                   success: false
 *                   message: "Invalid address ID."
 *               emptyPayload:
 *                 value:
 *                   success: false
 *                   message: "Failed to update address, at least one field is required."
 *       404:
 *         description: Address not found or no changes applied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Address not found or no changes were applied."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Failed to update address"
 */
router.patch('/:id', authMiddleware(),requireRoleByName('Admin','Seller'),updateAddress);

/**
 * @swagger
 * /address/{id}:
 *   delete:
 *     summary: Soft delete an address (set is_active = false)
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Address ID
 *     responses:
 *       204:
 *         description: Address soft-deleted successfully (no content)
 *       400:
 *         description: Invalid address ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Invalid address ID."
 *       404:
 *         description: Address not found or already inactive
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Address not found or already inactive."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Failed to soft delete address."
 */
router.delete('/:id', authMiddleware(), requireRoleByName('Admin','Seller'),softDeleteAddress);

export default router;
