// app/src/dao/customer.dao.ts

/**
 * Customer DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `customer` entity (singular).
 * 
 * The DAO (Data Access Object) pattern encapsulates the database access logic,
 * separating it from controllers and ensuring better code organization.
 *
 * Defined functions:
 *  - createCustomer: Inserts a new customer into the database.
 *  - getCustomerActive: Retrieves all active customers.
 *  - getCustomer: Retrieves all customers.
 *  - getCustomerByIdActive: Retrieves an active customer by ID.
 *  - getCustomerById: Retrieves a customer by ID.
 *  - updateCustomer: Updates an existing customer.
 *  - softDeleteCustomer: Marks a customer as inactive (soft delete).
 */

import Customer from "../models/customer.model";
import { CreateCustomerDto, UpdateCustomerDto, CustomerResponseDto } from "../dto/customer.dto";

/**
 * Inserts a new user into the database.
 *
 * @param data - Data required to create the user (CreateUserDto).
 * @returns {Promise<CustomerResponseDto>} - The created user.
 */
export const createCustomer = async (data: CreateCustomerDto): Promise<CustomerResponseDto> => {
  const customer = await Customer.create({
    address_id: data.address_id,
    gender_id: data.gender_id,
    fullname: data.fullname,
    phone: data.phone,
    email: data.email,
    birth_date: data.birth_date,
    is_active: data.is_active ?? true, // default if not provided
  });

  return customer.toJSON() as CustomerResponseDto;
};

/**
 * Retrieves all active customers from the `customer` table.
 *
 * @returns {Promise<CustomerResponseDto[]>} - List of active customers.
 */
export const getCustomerActive = async (): Promise<CustomerResponseDto[]> => {
  const customer = await Customer.findAll({ where: { is_active: true } });
  return customer.map((u: any) => u.toJSON() as CustomerResponseDto);
};

/**
 * Retrieves all customers from the `customer` table.
 *
 * @returns {Promise<CustomerResponseDto[]>} - List of customers.
 */
export const getCustomer = async (): Promise<CustomerResponseDto[]> => {
  const customer = await Customer.findAll();
  return customer.map((u: any) => u.toJSON() as CustomerResponseDto);
};

/**
 * Retrieves an active customer by ID.
 *
 * @param id_customer - Unique customer identifier.
 * @returns {Promise<CustomerResponseDto | null>} - Found customer or null.
 */
export const getCustomerByIdActive = async (id_customer: number): Promise<CustomerResponseDto | null> => {
  const customer = await Customer.findOne({ where: { id_customer, is_active: true } });
  return customer ? (customer.toJSON() as CustomerResponseDto) : null;
};

/**
 * Retrieves a customer by ID.
 *
 * @param id_customer - Unique customer identifier.
 * @returns {Promise<CustomerResponseDto | null>} - Found customer or null.
 */
export const getCustomerById = async (id_customer: number): Promise<CustomerResponseDto | null> => {
  const customer = await Customer.findByPk(id_customer);
  return customer ? (customer.toJSON() as CustomerResponseDto) : null;
};

/**
 * Updates an existing customer.
 *
 * @param id_customer - Customer identifier to update.
 * @param data - Data to update (UpdateCustomerDto).
 * @returns {Promise<CustomerResponseDto | null>} - Updated customer or null if not found.
 */
export const updateCustomer = async (id_customer: number, data: UpdateCustomerDto): Promise<CustomerResponseDto | null> => {
  const [rows, users] = await Customer.update(data, {
    where: { id_customer },
    returning: true,
  });

  if (rows > 0 && users.length > 0) {
  const updatedCustomer = users[0].toJSON() as CustomerResponseDto;
  return updatedCustomer;
  }
  return null;
};

/**
 * Marks a customer as inactive (soft delete).
 *
 * @param id_customer - Customer identifier.
 * @returns {Promise<boolean>} - true if the customer was updated, false if not found.
 */
export const softDeleteCustomer = async (id_customer: number): Promise<boolean> => {
  const [rows] = await Customer.update(
    { is_active: false },
    { where: { id_customer } }
  );

  return rows > 0;
};

