// Represents access credentials (authentication)
export interface AccessDTO {
  id_access?: number;
  role_id: number;
  user_id:number;
  password: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating new access credentials
export interface CreateAccessDTO {
  role_id: number;
  user_id:number;
  password: string;
  is_active: boolean;
}

// For updating access credentials
export interface UpdateAccessDTO {
  role_id?: number;
  user_id?:number;
  password?: string;
  is_active?: boolean;
}

