// Represents an order status (Pending, Delivered, etc.)
export interface OrderStatusDTO {
  id_order_status?: number;
  name: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new order status
export interface CreateOrderStatusDTO {
  name: string;
  is_active: boolean;
}

// For updating an order status
export interface UpdateOrderStatusDTO {
  name?: string;
  is_active?: boolean;
}
