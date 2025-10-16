import { Access, User } from "../models";
import {
  AccessDTO,
  CreateAccessDTO,
  UpdateAccessDTO,
} from "../dto/access.dto";

export const getAccesses = async (): Promise<AccessDTO[]> => {
  return await Access.findAll({ where: { is_active: true } });
};

export const getAccessById = async (id: number): Promise<AccessDTO | null> => {
  return await Access.findOne({ where: { id_access: id, is_active: true } });
};

export const findByDocument = async (document: string) => {
  return await Access.findOne({
    where: { document, is_active: true },
    include: [
      {
        model: User,
        as: "user",
        where: { is_active: true },
        required: false,
      },
    ],
  });
};

export const createAccess = async (data: CreateAccessDTO): Promise<AccessDTO> => {
  return await Access.create(data);
};

export const updateAccess = async (
  id: number,
  data: UpdateAccessDTO
): Promise<[number, AccessDTO[]]> => {
  return await Access.update(data, { where: { id_access: id }, returning: true });
};

export const softDeleteAccess = async (id: number): Promise<void> => {
  await Access.update({ is_active: false }, { where: { id_access: id } });
};
