import { Order } from "../models";
import {
  OrderDTO,
  CreateOrderDTO,
  UpdateOrderDTO
} from "../dto/order.dto";

// ORDER DAO
export const getOrders = async (): Promise<OrderDTO[]> => {
  return await Order.findAll({ where: { is_active: true } });
};

export const getOrderById = async (id: number): Promise<OrderDTO | null> => {
  return await Order.findOne({ where: { id_order: id, is_active: true } });
};

export const createOrder = async (data: CreateOrderDTO): Promise<OrderDTO> => {
  return await Order.create(data);
};

export const updateOrder = async (
  id: number,
  data: UpdateOrderDTO
): Promise<[number, OrderDTO[]]> => {
  return await Order.update(data, { where: { id_order: id }, returning: true });
};

export const softDeleteOrder = async (id_order: number): Promise<boolean> => {
  const [rows] = await Order.update(
    { is_active: false },
    { where: { id_order } }
  );

  return rows > 0;
};

