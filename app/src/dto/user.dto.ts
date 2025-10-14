/**
 * user DTO
 * ---------
 * This file defines the Data Transfer Objects (DTO) related to the `user` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

import { IsBoolean, IsDate, IsEmail, IsInt, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object for user creation.
 *
 * @property {number} access_id - Identifier of the access/credentials associated with the user.
 * @property {string} fullname - Full name of the user.
 * @property {string} email - Unique email address of the user.
 * @property {string} document - Unique document for login.
 * @property {boolean} [is_active] - Whether the user is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateuserDto = {
 *   access_id: 10,
 *   fullname: "David Martinez",
 *   email: "david@example.com",
 *   document: "123456789",
 *   is_active: true
 * };
 */

export class CreateUserDto {
  @IsInt()
  access_id!: number;

  @IsString()
  fullname!: string;

  @IsEmail()
  email!: string;

  @IsString()
  document!: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}


/**
 * Data Transfer Object for updating users.
 *
 * @property {number} [access_id] - Identifier of the address/credentials associated with the user.
 * @property {string} [fullname] - Full name of the user.
 * @property {string} [email] - Email address of the user.
 * @property {string} [document] - Updated document.
 * @property {boolean} [is_active] - Whether the user is active.
 * 
 * @example
 * const dto: UpdateuserDto = {
 *  email: "newmail@example.com",
 *  document: "987654321",
 *  is_active: false
 * };
 */

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  access_id?: number;

  @IsString()
  @IsOptional()
  fullname?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a user.
 *
 * @property {number} id_user - Unique identifier of the user.
 * @property {number} access_id - Identifier of the access/credentials associated with the user.
 * @property {string} fullname - Full name of the user.
 * @property {string} email - Unique email address of the user.
 * @property {string} document - Unique document for login.
 * @property {boolean} is_active - Whether the user is active.
 * @property {Date} createdAt - Timestamp of when the user was created.
 * @property {Date} updatedAt - Timestamp of when the user was last updated.
 * 
 * @example
 * const user: userResponseDto = {
 *   id_user: 1,
 *   access_id: 10,
 *   fullname: "David Martinez",
 *   email: "david@example.com",
 *   document: "123456789",
 *   birth_date: new Date("1995-05-20"),
 * };
 */

export class UserResponseDto {
  @IsInt()
  id_user!: number;

  @IsInt()
  access_id!: number;

  @IsString()
  fullname!: string;

  @IsEmail()
  email!: string;

  @IsString()
  document!: string;

  @IsBoolean() 
  is_active!: boolean;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}
