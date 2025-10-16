// Represents an order entity
export interface OrderDTO {
  id_order?: number;
  customer_id: number;
  order_status_id: number;
  warehouse_id: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new order
export interface CreateOrderDTO {
  customer_id: number;
  order_status_id: number;
  warehouse_id: number;
  is_active: boolean;
}

// For updating an existing order
export interface UpdateOrderDTO {
  customer_id?: number;
  order_status_id?: number;
  warehouse_id?: number;
  is_active?: boolean;
}