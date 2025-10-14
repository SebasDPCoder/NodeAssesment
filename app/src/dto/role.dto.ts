/**
 * Role DTO
 * ---------
 * This file defines the Data Transfer Objects (DTO) related to the `Role` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object for role creation.
 *
 * @property {string} name - Unique name of the role.
 * @property {boolean} [is_active] - Whether the role is active (optional, defaults to true).
 *
 */
export class CreateRoleDto {
  @IsString()
  name!: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating roles.
 *
 * @property {string} [name] - Role name.
 * @property {boolean} [is_active] - Whether the role is active.
 * 
 */
export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a role.
 *
 * @property {number} id_role - Unique identifier of the role.
 * @property {string} name - Role name.
 * @property {boolean} is_active - Whether the role is active.
 * @property {Date} createdAt - Timestamp of when the role was created.
 * @property {Date} updatedAt - Timestamp of when the role was last updated.
 * 
 */
export class RoleResponseDto {
  @IsInt()
  id_role!: number;

  @IsString()
  name!: string;

  @IsBoolean()
  is_active!: boolean;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}
