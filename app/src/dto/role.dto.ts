// Represents a user role (Admin, Customer, etc.)
export interface RoleDTO {
  id_role?: number;
  name: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// For creating a new role
export interface CreateRoleDTO {
  name: string;
  is_active: boolean;
}

// For updating an existing role
export interface UpdateRoleDTO {
  name?: string;
  is_active?: boolean;
}
