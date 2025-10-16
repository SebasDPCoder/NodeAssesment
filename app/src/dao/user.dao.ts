import {User, Access, Role} from "../models";
import { RegisterDto } from "../dto/auth.dto";
import {
  UserDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from "../dto/user.dto";

export const getUsers = async (): Promise<UserDTO[]> => {
  return await User.findAll({ where: { is_active: true } });
};

export const getUserById = async (id: number): Promise<UserDTO | null> => {
  return await User.findOne({ where: { id_user: id, is_active: true } });
};


export const createUserWithAccess = async (registerData: RegisterDto, hashedPassword: string) => {
    const roleId = (registerData as any).role_id || 2;
    const access = await Access.create({
        document: registerData.document,
        password: hashedPassword,
        role_id: roleId,
        is_active: true
    });
    
    const accessWithRole = await Access.findByPk(access.id_access, { include: [ { model: Role, as: "role" } ] });
    const user = await User.create({
        access_id: access.id_access,
        full_name: registerData.full_name,
        email: registerData.email,
        is_active: true
    });

    return {user:user, access:accessWithRole}
};

export const getUserWithRoleById = async (id_user: number) => {
    return User.findByPk(id_user, {
        include: [
            {
                model: Access,
                as: "access",
                include: [
                    {
                        model: Role,
                        as: "role"
                    }
                ]
            },
        ]
    });
};

export const findByEmail = async (email: string) => {
    return User.findOne({ where: { email } });
};

export const createUser = async (data: CreateUserDTO): Promise<UserDTO> => {
  return await User.create(data);
};

export const updateUser = async (
  id: number,
  data: UpdateUserDTO
): Promise<[number, UserDTO[]]> => {
  return await User.update(data, { where: { id_user: id }, returning: true });
};

export const softDeleteUser = async (id_user: number): Promise<boolean> => {
  const [rows] = await User.update(
    { is_active: false },
    { where: { id_user } }
  );

  return rows > 0;
};
