// Represents a product entity
export interface ProductDTO {
  id_product?: number;
  code: string;
  name: string;
  price: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new product
export interface CreateProductDTO {
  code: string;
  name: string;
  price: number;
  is_active: boolean;
}

// For updating product information
export interface UpdateProductDTO {
  code?: string;
  name?: string;
  price?: number;
  is_active?: boolean;
}