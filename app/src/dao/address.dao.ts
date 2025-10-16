import { Address } from "../models";
import {
  AddressDTO,
  CreateAddressDTO,
  UpdateAddressDTO,
} from "../dto/address.dto";

export const getAddresses = async (): Promise<AddressDTO[]> => {
  return await Address.findAll({ where: { is_active: true } });
};

export const getAddressById = async (id: number): Promise<AddressDTO | null> => {
  return await Address.findOne({ where: { id_address: id, is_active: true } });
};

export const getActiveAddress = async (): Promise<AddressDTO[]> => {
    const address = await Address.findAll({ where: { is_active: true } });

    return address.map((a: any) => a.toJSON() as AddressDTO);
};

export const createAddress = async (data: CreateAddressDTO): Promise<AddressDTO> => {
  return await Address.create(data);
};

export const updateAddress = async (
  id: number,
  data: UpdateAddressDTO
): Promise<[number, AddressDTO[]]> => {
  return await Address.update(data, { where: { id_address: id }, returning: true });
};

export const softDeleteAddress = async (id_address: number): Promise<boolean> => {
  const [rows] = await Address.update(
    { is_active: false },
    { where: { id_address } }
  );

  return rows > 0;
};
