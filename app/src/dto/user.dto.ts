// Represents a user entity
export interface UserDTO {
  id_user?: number;
  document: string;
  full_name: string;
  email: string;
  is_active: boolean,
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new user
export interface CreateUserDTO {
  document: string;
  full_name: string;
  email: string;
  is_active: boolean;
}

// For updating user data
export interface UpdateUserDTO {
  document?: string;
  full_name?: string;
  email?: string;
  is_active?: boolean;
}