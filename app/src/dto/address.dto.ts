// Represents an address entity
export interface AddressDTO {
  id_address?: number;
  country: string;
  city: string;
  department: string;
  street: string;
  number: string;
  postal_code: string;
  is_active:boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new address
export interface CreateAddressDTO {
  country: string;
  city: string;
  department: string;
  street: string;
  number: string;
  postal_code: string;
  is_active: boolean;
}

// For updating an existing address
export interface UpdateAddressDTO {
  country?: string;
  city?: string;
  department?: string;
  street?: string;
  number?: string;
  postal_code?: string;
  is_active: boolean;
}

