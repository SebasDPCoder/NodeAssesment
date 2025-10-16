// Represents a user entity
export interface UserDTO {
  id_user?: number;
  access_id: number;
  full_name: string;
  email: string;
  is_active: boolean,
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new user
export interface CreateUserDTO {
  access_id: number;
  full_name: string;
  email: string;
  is_active: boolean;
}

// For updating user data
export interface UpdateUserDTO {
  access_id?: number;
  full_name?: string;
  email?: string;
  is_active?: boolean;
}