
import { IsEmail, IsString, IsOptional, IsBoolean, IsDateString, IsInt, IsDate} from 'class-validator';
import { Type } from 'class-transformer';
/**
 * Customer DTO
 * ---------
 * This file defines the Data Transfer Objects (DTO) related to the `customer` entity (singular).
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for customer creation.
 *
 * @property {number} address_id - Identifier of the access/credentials associated with the customer.
 * @property {number} gender_id - Identifier of the customer’s gender.
 * @property {string} fullname - Full name of the customer.
 * @property {string} [phone] - Customer’s phone number (optional).
 * @property {string} email - Unique email address of the customer.
 * @property {Date} birth_date - Customer’s date of birth.
 * @property {boolean} [is_active] - Whether the customer is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateCustomerDto = {
 *   address_id: 10,
 *   gender_id: 1,
 *   fullname: "David Martinez",
 *   phone: "+573001112233",
 *   email: "david@example.com",
 *   birth_date: new Date("1995-05-20"),
 *   is_active: true
 * };
 */

export class CreateCustomerDto {
  @IsInt()
  address_id!: number;

  @IsInt()
  gender_id!: number;

  @IsString()
  fullname!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  email!: string;

  @IsDate()
  birth_date: Date;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean
}


/**
 * Data Transfer Object for updating customer.
 *
 * @property {number} [address_id] - Identifier of the address/credentials associated with the customer.
 * @property {number} [gender_id] - Identifier of the customer’s gender.
 * @property {string} [fullname] - Full name of the customer.
 * @property {string} [phone] - Phone number of the customer.
 * @property {string} [email] - Email address of the customer.
 * @property {Date} [birth_date] - Date of birth of the customer.
 * @property {boolean} [is_active] - Whether the customer is active.
 * 
 * @example
 * const dto: UpdateCustomerDto = {
 *  email: "newmail@example.com",
 *  phone: "+573009998877",
 *  is_active: false
 * };
 */

export class UpdateCustomerDto {

  @IsInt()
  @IsOptional()
  address_id?: number;
  
  @IsInt()
  @IsOptional()
  gender_id?: number;

  @IsString()
  @IsOptional()
  fullname?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;
  
  @IsDateString()
  @IsOptional()
  birth_date?: Date;
  
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a customer.
 *
 * @property {number} id_customer - Unique identifier of the customer.
 * @property {number} address_id - Identifier of the access/credentials associated with the customer.
 * @property {number} gender_id - Identifier of the customer’s gender.
 * @property {string} fullname - Full name of the customer.
 * @property {string} [phone] - Customer’s phone number (optional).
 * @property {string} email - Unique email address of the customer.
 * @property {Date} birth_date - Date of birth of the customer.
 * @property {boolean} is_active - Whether the customer is active.
 * @property {Date} createdAt - Timestamp of when the customer was created.
 * @property {Date} updatedAt - Timestamp of when the customer was last updated.
 * 
 * @example
 * const customer: CustomerResponseDto = {
 *   id_customer: 1,
 *   address_id: 10,
 *   gender_id: 1,
 *   fullname: "David Martinez",
 *   phone: "+573001112233",
 *   email: "david@example.com",
 *   birth_date: new Date("1995-05-20"),
 *   is_active: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */

export class CustomerResponseDto {
  
  @IsInt()
  id_customer!: number;
  
  @IsInt()
  address_id!: number;
  
  @IsInt()
  gender_id!: number;
  
  @IsString()
  fullname!: string;

  @IsString()
  @IsOptional()
  phone?: string;
  
  @IsString()
  email!: string;
  
  @IsDate()
  birth_date!: Date;
  
  @IsBoolean()
  is_active!: boolean;
  
  @IsDate()
  createdAt!: Date;
  
  @IsDate()
  updatedAt!: Date;
}
