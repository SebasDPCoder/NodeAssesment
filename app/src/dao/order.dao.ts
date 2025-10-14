/**
 * Order DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the orders entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Order from "../models/order.model";
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from "../dto/order.dto";

/**
 * A consistent DTO that reflects the database structure for responses.
 * This is used to ensure the DAO returns a standardized object that
 * matches the ORM model's attributes.
 */

/**
 * Inserts a new order record into the database.
 * @param data - Data required to create the order (CreateOrderDto).
 * @returns {Promise<OrderResponseDto>} - The created order record.
 */
export const createOrder = async (data: CreateOrderDto): Promise<OrderResponseDto> => {
    const newOrder = await Order.create({
        customer_id: data.customer_id,
        seller_id: data.seller_id,
        payment_method_id: data.payment_method_id,
        order_status_id: data.order_status_id,
        payment_date: data.payment_date || new Date(),
        total: data.total,
        is_active: data.is_active || true,
    });

    return newOrder.toJSON() as any;
};

/**
 * Retrieves all orders from the 'orders' table.
 * @returns {Promise<OrderResponseDto[]>} - List of all orders.
 */
export const getOrders = async (): Promise<OrderResponseDto[]> => {
    const orders = await Order.findAll();
    return orders.map((u: any) => u.toJSON() as any);
};

/**
 * Retrieves all active orders from the 'orders' table.
 * @returns {Promise<OrderResponseDto[]>} - List of active orders.
 */
export const getActiveOrders = async (): Promise<OrderResponseDto[]> => {
    const orders = await Order.findAll({ where: { is_active: true } });

    return orders.map((u: any) => u.toJSON() as any);
};

/**
 * Retrieves an order record by its unique ID.
 * @param id_order - Unique order identifier.
 * @returns {Promise<OrderResponseDto | null>} - The found order record or null if not found.
 */
export const getOrderById = async (id_order: number): Promise<OrderResponseDto | null> => {
    const order = await Order.findByPk(id_order);

    if (!order) {
        return null;
    }
    return order.toJSON() as any;
};

/**
 * Retrieves all orders for a specific customer.
 * @param customer_id - The customer's unique identifier.
 * @returns {Promise<OrderResponseDto[]>} - A list of orders for the customer.
 */
export const getOrdersByCustomerId = async (customer_id: number): Promise<OrderResponseDto[]> => {
    const orders = await Order.findAll({ where: { customer_id, is_active: true } });

    return orders.map((u) => u.toJSON() as any);
};

/**
 * Updates an existing order record by its ID.
 * @param id_order - Order identifier to update.
 * @param data - Data to update (UpdateOrderDto).
 * @returns {Promise<OrderResponseDto | null>} - The updated order record or null if not found.
 */
export const updateOrder = async (id_order: number, data: UpdateOrderDto): Promise<OrderResponseDto | null> => {
    const [rowsAffected, Orders] = await Order.update(data, {
        where: { id_order },
        returning: true,
    });

    if (rowsAffected > 0 && Orders.length > 0) {
      const updatedOrder = Orders[0].toJSON() as any;
      return updatedOrder;
      }
      return null;
};

/**
 * Performs a soft delete on an order record by marking it as inactive.
 * @param id_order - Order identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteOrder = async (id_order: number): Promise<boolean> => {
    const [rowsAffected] = await Order.update(
        { is_active: false },
        { where: { id_order } }
    );

    return rowsAffected > 0;
};
