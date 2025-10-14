import { Router } from 'express';
import { getRole, getRoleById } from '../controllers/role.controller';
import { authMiddleware } from '../middleware/auth.midleware';
import { requireRoleByName } from '../middleware/rbac.guard';

const router = Router();

/* =========================
 * ROLES
 * ========================= */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles (active and inactive)
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id_role: 1
 *                 name: "Admin"
 *                 is_active: true
 *               - id_role: 2
 *                 name: "User"
 *                 is_active: false
 *       500:
 *         description: Failed to retrieve role
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to retrieve role."
 */
router.get("/", authMiddleware(),requireRoleByName('Admin','Analyst'),getRole);

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get role by ID (active or inactive)
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id_role: 1
 *               name: "Admin"
 *               is_active: true
 *       400:
 *         description: Invalid Role ID
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid Role ID."
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Role not found."
 *       500:
 *         description: Failed to retrieve role
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to retrieve role."
 */
router.get("/:id",authMiddleware(), requireRoleByName('Admin','Analyst'),getRoleById);

export default router;
