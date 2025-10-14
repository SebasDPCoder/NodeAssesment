import { Router } from 'express';
import { getOrderStatus, getOrderStatusById } from '../controllers/order_status.controller';
import { authMiddleware } from '../middleware/auth.midleware';
import { requireRoleByName } from '../middleware/rbac.guard';

const router = Router();

/* =========================
 * ORDER STATUS
 * ========================= */

/**
 * @swagger
 * /order_status:
 *   get:
 *     summary: Get all order statuses (active and inactive)
 *     tags: [OrderStatus]
 *     responses:
 *       200:
 *         description: List of order statuses retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id_order_status: 1
 *                 name: "Pending"
 *                 active: true
 *               - id_order_status: 2
 *                 name: "Cancelled"
 *                 active: false
 *       500:
 *         description: Failed to retrieve order status
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to retrieve order status."
 */
router.get("/", authMiddleware(),requireRoleByName('Admin','Seller'),getOrderStatus);

/**
 * @swagger
 * /order_status/{id}:
 *   get:
 *     summary: Get order status by ID (active or inactive)
 *     tags: [OrderStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order Status ID
 *     responses:
 *       200:
 *         description: Order status retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id_order_status: 1
 *               name: "Pending"
 *               active: true
 *       400:
 *         description: Invalid Order Status ID
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid Order Status ID."
 *       404:
 *         description: Order Status not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Order Status not found."
 *       500:
 *         description: Failed to retrieve order status
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to retrieve order status."
 */
router.get("/:id", authMiddleware(),requireRoleByName('Admin','Seller'),getOrderStatusById);

export default router;