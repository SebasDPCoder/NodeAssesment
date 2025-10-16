// Represents a product inside an order
export interface OrderItemDTO {
  id_order_items?: number;
  product_id: number;
  order_id: number;
  quantity: number;
  is_active: boolean
  created_at?: Date;
  updated_at?: Date;
}

// For creating an order item (a product in an order)
export interface CreateOrderItemDTO {
  product_id: number;
  order_id: number;
  quantity: number;
  is_active: boolean
}

// For updating an order item (e.g. quantity)
export interface UpdateOrderItemDTO {
  quantity?: number;
  is_active?: boolean
}

