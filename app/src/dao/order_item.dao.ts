/**
 * OrderItem DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the sellers entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import OrderItem from "../models/order_item.model";
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItemResponseDto } from "../dto/order_items.dto";

/**
 * Inserts a new seller record into the database.
 * @param data - Data required to create the seller (CreateOrderItemDto).
 * @returns {Promise<OrderItemResponseDto>} - The created seller record.
 */
export const createOrderItem = async (data: CreateOrderItemDto): Promise<OrderItemResponseDto> => {
    const newOrderItem = await OrderItem.create({
        order_id: data.order_id,
        product_id: data.product_id,
        price: data.price,
        amount: data.amount,
        subtotal: data.subtotal,
        is_active: data.is_active ?? true, // default value if not provided
    });
    return newOrderItem.toJSON() as OrderItemResponseDto;
};

/**
 * Retrieves all OrderItems from the 'OrderItems' table.
 * @returns {Promise<OrderItemResponseDto[]>} - List of all OrderItems.
 */
export const getOrderItems = async (): Promise<OrderItemResponseDto[]> => {
    const orderItem = await OrderItem.findAll();
    return orderItem.map((a: any) => a.toJSON() as OrderItemResponseDto);
};

/**
 * Retrieves all active OrderItems from the 'OrderItems' table.
 * @returns {Promise<OrderItemResponseDto[]>} - List of active OrderItems.
 */
export const getActiveOrderItem = async (): Promise<OrderItemResponseDto[]> => {
    const orderItem = await OrderItem.findAll({ where: { is_active: true } });

    return orderItem.map((a: any) => a.toJSON() as OrderItemResponseDto);
};

/**
 * Retrieves a OrderItem record by its unique ID.
 * @param id_order_item - Unique OrderItem identifier.
 * @returns {Promise<OrderItemResponseDto | null>} - The found OrderItem record or null if not found.
 */
export const getOrderItemById = async (id_order_item: number): Promise<OrderItemResponseDto | null> => {
    const orderItem = await OrderItem.findByPk(id_order_item);

    if (!orderItem) {
        return null;
    }

    return orderItem ? (orderItem.toJSON() as OrderItemResponseDto) : null;
};

/**
 * Updates an existing OrderItem record by its ID.
 * @param id_order_item - OrderItem identifier to update.
 * @param data - Data to update (UpdateOrderItemDto).
 * @returns {Promise<OrderItemResponseDto | null>} - The updated OrderItem record or null if not found.
 */
export const updateOrderItem = async (id_order_item: number, data: UpdateOrderItemDto): Promise<OrderItemResponseDto | null> => {
    const [rowsAffected, orderItem] = await OrderItem.update(data, {
        where: { id_order_item },
        returning: true,
    });

    if (rowsAffected > 0 && orderItem.length > 0) {
        const updatedOrderItem = orderItem[0].toJSON() as OrderItemResponseDto;
        return updatedOrderItem;
      }
      return null;
};

/**
 * Performs a soft delete on a OrderItem record by marking it as inactive.
 * @param id_order_item - OrderItem identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteOrderItem = async (id_order_item: number): Promise<boolean> => {
    const [rowsAffected] = await OrderItem.update(
        { is_active: false },
        { where: { id_order_item } }
    );

    return rowsAffected > 0;
};
