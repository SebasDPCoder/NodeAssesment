// Represents a customer entity
export interface CustomerDTO {
  id_customer?: number;
  address_id: number;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new customer
export interface CreateCustomerDTO {
  address_id: number;
  full_name: string;
  email: string;
  is_active: boolean;
}

// For updating customer data
export interface UpdateCustomerDTO {
  address_id?: number;
  full_name?: string;
  email?: string;
  is_active?: boolean;
}
