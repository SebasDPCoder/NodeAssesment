// src/dto/order.dto.ts

import { IsBoolean, IsDate, IsDateString, IsInt, IsNumber, IsOptional } from "class-validator";

/**
 * Order DTOs
 * --------------
 * This file defines the Data Transfer Objects (DTOs) related to the `order` entity (singular).
 */

/**
 * Data Transfer Object for creating an order.
 *
 * @property {number} customer_id - Customer identifier.
 * @property {number} seller_id - seller identifier linked to the order.
 * @property {number} payment_method_id - Payment method identifier linked to the order (optional).
 * @property {number} order_status_id - Current status of the order (e.g., 'pending', 'shipped', 'delivered').
 * @property {Date} payment_date - Date when the payment was made (optional, defaults to current date).
 * @property {number} total - Total value of the order.
 * @property {boolean} [is_active] - Order state (true = visible, false = hidden).
 * 
 * @example
 * const dto: CreateOrderDto = {
 *   customer_id: 123456,
 *   seller_id: 5,
 *  payment_method_id: 2,
 *   order_status_id: 1,
 *  payment_date: new Date(),
 *   total: 500.0,
 *   is_active: true
 * };
 */

export class CreateOrderDto {
  @IsInt()
  customer_id: number;

  @IsInt()
  seller_id: number;

  @IsInt()
  @IsOptional()
  payment_method_id: number;

  @IsInt()
  order_status_id: number;

  @IsDateString()
  @IsOptional()
  payment_date?: Date;

  @IsNumber()
  total: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating an order.
 *
 * @property {number} [customer_id] - Customer identifier.
 * @property {number} [seller_id] - Bank identifier linked to the order.
 * @property {number} [payment_method_id] - Payment method identifier linked to the order (optional).
 * @property {number} [order_status_id] - Current status of the order (e.g., 'pending', 'shipped', 'delivered').
 * @property {number} [total] - Total value of the order.
 * @property {Date} [payment_date] - Date when the payment was made (optional, defaults to current date).
 * @property {boolean} [is_active] - Order state (true = visible, false = hidden).
 *
 * @example
 * const dto: UpdateOrderDto = {
 *   customer_id: 123456,
 *  seller_id: 5,
 *   order_status_id: 2,
 *   total: 750.0,
 *   is_active: false
 * };
 */

export class UpdateOrderDto {
  @IsInt()
  @IsOptional()
  customer_id?: number;

  @IsInt()
  @IsOptional()
  seller_id?: number;

  @IsInt()
  @IsOptional()
  payment_method_id?: number;

  @IsInt()
  @IsOptional()
  order_status_id?: number;

  @IsDateString()
  @IsOptional()
  payment_date?: Date;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * Data Transfer Object representing the response of an order.
 *
 * @property {number} id_order - Unique identifier of the order.
 * @property {number} customer_id - Customer identifier.
 * @property {number} seller_id - Bank identifier linked to the order.
 * @property {number} payment_method_id - Payment method identifier linked to the order (optional).
 * @property {number} order_status_id - Current status of the order (e.g., 'pending', 'shipped', 'delivered').
 * @property {Date} payment_date - Date when the payment was made.
 * @property {number} total - Total value of the order.
 * @property {boolean} is_active - Order state (true = visible, false = hidden).
 *
 * @example
 * const order: OrderResponseDto = {
 *   id_order: 1,
 *   customer_id: 123456,
 *   seller_id: 5,
 *  payment_method_id: 2,
 *   order_status_id: 2,
 *  payment_date: new Date(),
 *   total: 500.0,
 *   is_active: true
 * };
 */

export class OrderResponseDto {
  @IsInt()
  id_order!: number;
  
  @IsInt()
  customer_id!: number;
  
  @IsInt()
  seller_id!: number;
  
  @IsInt()
  payment_method_id!: number;
  
  @IsInt()
  order_status_id!: number;
  
  @IsDate()
  payment_date!: Date;
  
  @IsNumber()
  total!: number;
  
  @IsBoolean()
  is_active!: boolean;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}

