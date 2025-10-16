// Represents the relationship between warehouse and products
export interface WarehouseProductDTO {
  id_warehouse_product?: number;
  warehouse_id: number;
  product_id: number;
  stock_quantity: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a warehouse-product relationship
export interface CreateWarehouseProductDTO {
  warehouse_id: number;
  product_id: number;
  stock_quantity: number;
  is_active: boolean;

}

// For updating stock quantity or relationship data
export interface UpdateWarehouseProductDTO {
  stock_quantity?: number;
  is_active?: boolean;

}
