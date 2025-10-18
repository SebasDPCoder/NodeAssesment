import { Customer } from "../models";
import {
  CustomerDTO,
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "../dto/customer.dto";


export const getCustomers = async (): Promise<CustomerDTO[]> => {
  return await Customer.findAll({ where: { is_active: true } });
};

export const getCustomerById = async (id: number): Promise<CustomerDTO | null> => {
  return await Customer.findOne({ where: { id_customer: id, is_active: true } });
};

export const createCustomer = async (data: CreateCustomerDTO): Promise<CustomerDTO> => {
  return await Customer.create(data);
};

export const updateCustomer = async (
  id: number,
  data: UpdateCustomerDTO
): Promise<[number, CustomerDTO[]]> => {
  return await Customer.update(data, { where: { id_customer: id }, returning: true });
};

export const softDeleteCustomer = async (id_customer: number): Promise<boolean> => {
  const [rows] = await Customer.update(
    { is_active: false },
    { where: { id_customer } }
  );

  return rows > 0;
};
