// Represents a warehouse entity
export interface WarehouseDTO {
  id_warehouse?: number;
  name: string;
  location: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new warehouse
export interface CreateWarehouseDTO {
  name: string;
  location: string;
  is_active: boolean;
}

// For updating existing warehouse data
export interface UpdateWarehouseDTO {
  name?: string;
  location?: string;
  is_active?: boolean;
}