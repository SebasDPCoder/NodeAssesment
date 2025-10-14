import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, IsInt } from "class-validator";

/**
 * Product DTOs
 * ------------
 * Defines the Data Transfer Objects (DTOs) for the `products` entity.
 */

/**
 * DTO for creating a product.
 *
 * @property {string} code - Unique internal code (SKU).
 * @property {string} name - Product name.
 * @property {number} price - Product price.
 * @property {string} description - Detailed description of the product.
 * @property {boolean} [is_deleted] - Logical deletion flag (optional, defaults to false).
 *
 * @example
 * const dto: CreateProductDto = {
 *   code: "PS5-001",
 *   name: "Play Station 5",
 *   price: 1500.0,
 *   description: "Next-generation gaming console",
 * };
 */
export class CreateProductDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  description!: string;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}

/**
 * DTO for updating a product.
 *
 * @property {string} [code] - Unique internal code (SKU).
 * @property {string} [name] - Product name.
 * @property {number} [price] - Product price.
 * @property {string} [description] - Detailed description.
 * @property {boolean} [is_deleted] - Logical deletion flag.
 *
 * @example
 * const dto: UpdateProductDto = {
 *   price: 1499.99,
 *   is_deleted: false
 * };
 */
export class UpdateProductDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}

/**
 * DTO representing a product response.
 *
 * @property {number} id_product - Unique identifier.
 * @property {string} code - Product code (SKU).
 * @property {string} name - Product name.
 * @property {number} price - Product price.
 * @property {string} description - Product description.
 * @property {boolean} is_deleted - Logical deletion flag.
 * @property {Date} created_at - Creation date.
 * @property {Date} updated_at - Last update date.
 *
 * @example
 * const product: ProductResponseDto = {
 *   id_product: 1,
 *   code: "PS5-001",
 *   name: "Play Station 5",
 *   price: 1500.0,
 *   description: "Next-generation gaming console",
 *   is_deleted: false,
 *   created_at: new Date(),
 *   updated_at: new Date()
 * };
 */
export class ProductResponseDto {
  @IsInt()
  id_product!: number;

  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  description!: string;

  @IsBoolean()
  is_deleted!: boolean;

  @IsDate()
  created_at!: Date;

  @IsDate()
  updated_at!: Date;
}