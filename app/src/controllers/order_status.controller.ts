import { Request, Response } from "express";
import * as orderStatusDao from "../dao/order_status.dao";

// --- READ (GET) ---

/**
 * Get order_status actives and inactives
 * GET /api/order_status
 */
export const getOrderStatus = async (_req: Request, res: Response): Promise<Response> => {                  
    try {
        const order_status = await orderStatusDao.getOrderStatuses();
        return res.json(order_status);
    } catch (err: any) {
        console.error("Error getting order status:", err.message);
        return res.status(500).json({ error: "Failed to retrieve order status." });
    }
}
/**
 * Get order_status active or inactive by id
 * GET /api/order_status/:id
 */
export const getOrderStatusById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_order_status = parseInt(req.params.id, 10);
        if (isNaN(id_order_status)) {
            return res.status(400).json({ error: "Invalid Order Status ID." });
        }
        const order_status = await orderStatusDao.getOrderStatusById(id_order_status);
        if (!order_status) {
            return res.status(404).json({ error: "Order Status not found." });
        }
        return res.json(order_status);
    } catch (err: any) {
        console.error("Error getting Order Status by ID:", err.message);
        return res.status(500).json({ error: "Failed to retrieve order status." });
    }
}
