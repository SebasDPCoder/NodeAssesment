/**
 * OrderStatus DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `order_status` entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import OrderStatus from "../models/order_status.model";
import { CreateOrderStatusDto, UpdateOrderStatusDto, OrderStatusResponseDto} from "../dto/order_status.dto";

/**
 * Inserts a new order status record into the database.
 * @param data - Data required to create the order status (CreateOrderStatusDto).
 * @returns {Promise<OrderStatusResponseDto>} - The created order status record.
 */
export const createOrderStatus = async (data: CreateOrderStatusDto): Promise<OrderStatusResponseDto> => {
    const newOrderStatus = await OrderStatus.create({
        name: data.name,
        is_active: data.is_active || true,
    });
    return newOrderStatus.toJSON() as OrderStatusResponseDto;
};

/**
 * Retrieves all order statuses from the 'order_status' table.
 * @returns {Promise<OrderStatusResponseDto[]>} - List of all order statuses.
 */
export const getOrderStatuses = async (): Promise<OrderStatusResponseDto[]> => {
    const orderStatuses = await OrderStatus.findAll();
    return orderStatuses.map((u: any) => u.toJSON() as OrderStatusResponseDto);
};

/**
 * Retrieves all active order statuses from the 'order_status' table.
 * @returns {Promise<OrderStatusResponseDto[]>} - List of active order statuses.
 */
export const getActiveOrderStatuses = async (): Promise<OrderStatusResponseDto[]> => {
    const orderStatuses = await OrderStatus.findAll({ where: { is_active: true } });

    return orderStatuses.map((u: any) => u.toJSON() as OrderStatusResponseDto);
};

/**
 * Retrieves an order status record by its unique ID.
 * @param id_order_status - Unique order status identifier.
 * @returns {Promise<OrderStatusResponseDto | null>} - The found order status record or null if not found.
 */
export const getOrderStatusById = async (id_order_status: number): Promise<OrderStatusResponseDto | null> => {
    const orderStatus = await OrderStatus.findByPk(id_order_status);

    if (!orderStatus) {
        return null;
    }
    return orderStatus.toJSON() as OrderStatusResponseDto;
};
/**
 * Updates an existing order status record by its ID.
 * @param id_order_status - Order status identifier to update.
 * @param data - Data to update (UpdateOrderStatusDto).
 * @returns {Promise<OrderStatusResponseDto | null>} - The updated order status record or null if not found.
 */
export const updateOrderStatus = async (id_order_status: number, data: UpdateOrderStatusDto): Promise<OrderStatusResponseDto | null> => {
    const [rowsAffected, Orders] = await OrderStatus.update(data, {
        where: { id_order_status },
        returning: true,
    });

    if (rowsAffected > 0 && Orders.length > 0) {
    const updatedOrderStatus = Orders[0].toJSON() as OrderStatusResponseDto;
    return updatedOrderStatus;
    }
    return null;
};

/**
 * Performs a soft delete on an order status record by marking it as inactive.
 * @param id_order_status - Order status identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteOrderStatus = async (id_order_status: number): Promise<boolean> => {
    const [rowsAffected] = await OrderStatus.update(
        { is_active: false },
        { where: { id_order_status } }
    );

    return rowsAffected > 0;
};
