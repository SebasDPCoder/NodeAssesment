import Role  from "../models/role.model";
import {
  RoleDTO,
  CreateRoleDTO,
  UpdateRoleDTO,
} from "../dto/role.dto";


export const getRoles = async (): Promise<RoleDTO[]> => {
  return await Role.findAll({ where: { is_active: true } });
};

export const getRoleById = async (id: number): Promise<RoleDTO | null> => {
  return await Role.findOne({ where: { id_role: id, is_active: true } });
};

export const createRole = async (data: CreateRoleDTO): Promise<RoleDTO> => {
  return await Role.create(data);
};

export const updateRole = async (id: number, data: UpdateRoleDTO): Promise<[number, RoleDTO[]]> => {
  return await Role.update(data, { where: { id_role: id }, returning: true });
};

export const softDeleteRole = async (id: number): Promise<void> => {
  await Role.update({ is_active: false }, { where: { id_role: id } });
};

