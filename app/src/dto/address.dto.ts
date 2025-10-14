import { IsEmail, IsString, IsOptional, IsBoolean, IsDateString, IsInt, isInt, IsDate} from 'class-validator';
import { Type } from 'class-transformer';
// app/src/dto/addresses.dto.ts

/**
 * Address DTO
 * -------------
 * This file defines the Data Transfer Objects (DTO) related to the addresses entity.
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for creating an address.
 *
 * @property {string} country - Identifier of the country associated with the address.
 * @property {string} department - Identifier of the departament associated with the address.
 * @property {string} city - Identifier of the city associated with the address.
 * @property {string} postal_code - Postal code of the address.
 * @property {string} street - Street name and number.
 * @property {string} number - Street indentificators
 * @property {boolean} is_active - Whether the access is active (optional, defaults to true) or not.
 * 
 * @example
 * const dto: CreateAddressDto = {
 *   country_id: colombia;
 *   department: atlantico;
 *   city: barranquilla,
 *   postal_code: "10001",
 *   street: "Main St",
 *   number: "953-2"
 *   is_active: true
 * };
 */
export class CreateAddressDto {
  @IsString()
  country!: string;
  
  @IsString()
  department!: string;
  
  @IsString()
  city!: string;
  
  @IsString()
  postal_code!: string; 
  
  @IsString()
  street!: string;
  
  @IsString()
  number!: string;
  
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating an address.
 *
 * @property {string} [city] - Name of the city associated with the address.
 * @property {string} [department] - Name of the departament associated with the address.
 * @property {string} [country] - Name of the country associated with the address.
 * @property {string} [postal_code] - Postal code of the address.
 * @property {string} [street] - Street name and number.
 * @property {string} [number] - Street indentificators
 * @property {boolean} [is_active] - Whether the access is active (optional, defaults to true) or not.
 *
 * @example
 * const dto: UpdateAddressDto = {
 *   city: "Los Angeles",
 *   is_primary: false
 * };
 */
export class UpdateAddressDto {

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  postal_code?: string; 

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of an address.
 *
 * @property {number} id_address - Unique identifier of the address.
 * @property {string} country - Country of the address.
 * @property {string} department - Department of the address.
 * @property {string} city - City where the address is located.
 * @property {string} postal_code - Postal code of the address.
 * @property {string} street - Street name and number.
 * @property {string} number - Street indentificators
 * @property {boolean} is_active - Whether this is the primary address.
 * @property {Date} createdAt - Timestamp when the address was created.
 * @property {Date} updatedAt - Timestamp when the address was last updated.
 *
 * @example
 * const address: AddressResponseDto = {
 *   id_address: 5,
 *   street: "123 Main St",
 *   city: "New York",
 *   state: "NY",
 *   postal_code: "10001",
 *   country: "USA",
 *   is_primary: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */
export class AddressResponseDto {
  @IsInt()
  id_address!: number;
  
  @IsString()
  country!: string;
  
  @IsString()
  department!: string;
  
  @IsString()
  city!: string;
  
  @IsString()
  postal_code!: string;

  @IsString()
  street!: string;

  @IsString()
  number!: string;
  
  @IsBoolean()
  is_active!: boolean;

  @IsDateString()
  createdAt!: Date;

  @IsDateString()
  updatedAt!: Date;
}