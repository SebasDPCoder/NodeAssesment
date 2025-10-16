import { OrderStatus } from "../models";
import {
  OrderStatusDTO,
  CreateOrderStatusDTO,
  UpdateOrderStatusDTO,
} from "../dto/order_status.dto";

// Get all active order statuses
export const getOrderStatuses = async (): Promise<OrderStatusDTO[]> => {
  return await OrderStatus.findAll({ where: { is_active: true } });
};

// Get order status by ID
export const getOrderStatusById = async (id: number): Promise<OrderStatusDTO | null> => {
  return await OrderStatus.findOne({ where: { id_order_status: id, is_active: true } });
};

// Create a new order status
export const createOrderStatus = async (data: CreateOrderStatusDTO): Promise<OrderStatusDTO> => {
  return await OrderStatus.create(data);
};

// Update existing order status
export const updateOrderStatus = async (
  id: number,
  data: UpdateOrderStatusDTO
): Promise<[number, OrderStatusDTO[]]> => {
  return await OrderStatus.update(data, { where: { id_order_status: id }, returning: true });
};

// Soft delete (mark as inactive)
export const softDeleteOrderStatus = async (id: number): Promise<void> => {
  await OrderStatus.update({ is_active: false }, { where: { id_order_status: id } });
};
