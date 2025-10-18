import { OrderItem } from "../models";
import { OrderItemDTO, CreateOrderItemDTO, UpdateOrderItemDTO } from "../dto/order_item.dto";


export const getOrderItems = async (): Promise<OrderItemDTO[]> => {
  return await OrderItem.findAll({ where: { is_active: true } });
};

export const getOrderItemById = async (id: number): Promise<OrderItemDTO | null> => {
  return await OrderItem.findOne({ where: { id_order_item: id, is_active: true } });
};

export const createOrderItem = async (data: CreateOrderItemDTO): Promise<OrderItemDTO> => {
  return await OrderItem.create(data);
};

export const updateOrderItem = async (
  id: number,
  data: UpdateOrderItemDTO
): Promise<[number, OrderItemDTO[]]> => {
  return await OrderItem.update(data, { where: { id_order_item: id }, returning: true });
};

export const softDeleteOrderItem = async (id: number): Promise<boolean> => {
  const [rows] = await OrderItem.update(
    { is_active: false },
    { where: { id_order_item: id } }
  );

  return rows > 0;
};

