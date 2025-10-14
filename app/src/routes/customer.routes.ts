/**
 * Routes (customer)
 * ---------------------------------
 * Endpoints CRUD:
 * - POST /api/customers       -> createCustomer
 * - GET /api/customers        -> getCustomers
 * - GET /api/customers/active -> getActiveCustomers
 * - GET /api/customers/:id    -> getCustomerById
 * - PATCH /api/customers/:id  -> updateCustomer
 * - DELETE /api/customers/:id -> softDeleteCustomer
 */

import { Router } from "express";
import { 
    createCustomer, 
    getCustomers, 
    getCustomerById, 
    updateCustomer, 
    softDeleteCustomer,
    getActiveCustomers
} from "../controllers/customer.controller";
import { authMiddleware } from "../middleware/auth.midleware";
import { requireRoleByName } from "../middleware/rbac.guard";
const router = Router();

// --- POST ---
/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerDto'
 *           example:
 *             address_id: 1
 *             gender_id: 1
 *             fullname: "David Martinez"
 *             email: "david@example.com"
 *             phone: "+573001112233"
 *             birth_date: "1995-05-20"
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Customer created successfully"
 *               data:
 *                 id_customer: 1
 *                 address_id: 1
 *                 gender_id: 1
 *                 fullname: "David Martinez"
 *                 email: "david@example.com"
 *                 phone: "+573001112233"
 *                 birth_date: "1995-05-20T00:00:00.000Z"
 *                 active: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Validation error"
 *               errors:
 *                 email: "Email is required"
 *       409:
 *         description: Customer already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Email already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error during creation"
 */

router.post("/", authMiddleware(),requireRoleByName('Admin','Seller'),createCustomer);

// --- GET all ---
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers (active and inactive)
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Customers retrieved successfully"
 *               data:
 *                 - id_customer: 1
 *                   fullname: "David Martinez"
 *                   email: "david@example.com"
 *                   phone: "+573001112233"
 *                   birth_date: "1995-05-20T00:00:00.000Z"
 *                   active: true
 *                 - id_customer: 2
 *                   fullname: "Ana Lopez"
 *                   email: "ana@example.com"
 *                   phone: "+573002223344"
 *                   birth_date: "1990-10-15T00:00:00.000Z"
 *                   active: false
 *       500:
 *         description: Failed to retrieve customers
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while retrieving customers"
 */
router.get("/", authMiddleware(),requireRoleByName('Admin','Seller'),getCustomers);

// --- GET active ---
/**
 * @swagger
 * /customers/active:
 *   get:
 *     summary: Get all active customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of active customers retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Active customers retrieved successfully"
 *               data:
 *                 - id_customer: 1
 *                   fullname: "David Martinez"
 *                   email: "david@example.com"
 *                   phone: "+573001112233"
 *                   birth_date: "1995-05-20T00:00:00.000Z"
 *                   active: true
 *       500:
 *         description: Failed to retrieve active customers
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while retrieving active customers"
 */
router.get("/active", authMiddleware(),requireRoleByName('Admin','Seller'),getActiveCustomers);

// --- GET by ID ---
/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID (active or inactive)
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer found successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Customer retrieved successfully"
 *               data:
 *                 id_customer: 1
 *                 fullname: "David Martinez"
 *                 email: "david@example.com"
 *                 phone: "+573001112233"
 *                 birth_date: "1995-05-20T00:00:00.000Z"
 *                 active: true
 *       400:
 *         description: Invalid customer ID
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Customer ID must be an integer"
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Customer with ID 99 not found"
 *       500:
 *         description: Failed to retrieve customer
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while retrieving customer"
 */
router.get("/:id", authMiddleware(),requireRoleByName('Admin','Seller'),getCustomerById);

// --- UPDATE ---
/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerDto'
 *           example:
 *             fullname: "David Martinez Updated"
 *             phone: "+573009998877"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Customer updated successfully"
 *               data:
 *                 id_customer: 1
 *                 fullname: "David Martinez Updated"
 *                 email: "david@example.com"
 *                 phone: "+573009998877"
 *                 birth_date: "1995-05-20T00:00:00.000Z"
 *                 active: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid phone number format"
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Customer with ID 50 not found"
 *       500:
 *         description: Failed to update customer
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while updating customer"
 */
router.patch("/:id", authMiddleware(),requireRoleByName('Admin','Seller'),updateCustomer);

// --- DELETE ---
/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Soft delete a customer (set active=false)
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer ID
 *     responses:
 *       204:
 *         description: Customer soft-deleted successfully
 *       404:
 *         description: Customer not found or already inactive
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Customer with ID 30 not found or already inactive"
 *       500:
 *         description: Failed to soft delete customer
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error while deleting customer"
 */
router.delete("/:id", authMiddleware(),requireRoleByName('Admin','Seller'),softDeleteCustomer);

export default router;
