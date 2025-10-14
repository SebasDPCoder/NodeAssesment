/**
 * Order Item DTO
 * --------------
 * This file defines the Data Transfer Objects (DTO) related to the `order_items` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

import { IsBoolean, IsDate, IsDateString, IsIn, IsInt, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object for creating an order item.
 *
 * @property {number} order_id - Foreign key referencing the order.
 * @property {number} product_id - Foreign key referencing the product.
 * @property {number} amount - amount ordered.
 * @property {number} price - Price of the individual product.
 * @property {number} subtotal - Calculated as price * amount.
 * @property {boolean} [is_active] - Optional flag to indicate if item is active (default true).
 *
 * @example
 * const dto: CreateOrderItemDto = {
 *   order_id: 1,
 *   product_id: 5,
 *   amount: 2,
 *   price: 100.00,
 *   subtotal: 200.00
 * };
 */
export class CreateOrderItemDto {
    @IsInt()
    order_id!: number;

    @IsInt()
    product_id!: number;

    @IsInt()
    price!: number;

    @IsInt()
    amount!: number;

    @IsInt()
    subtotal!: number;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

/**
 * Data Transfer Object for updating an order item.
 *
 * @property {number} [price] - Updated price.
 * @property {number} [amount] - Updated amount.
 * @property {number} [subtotal] - Updated subtotal.
 * @property {boolean} [is_active] - Update active state.
 *
 * @example
 * const dto: UpdateOrderItemDto = {
 *   amount: 3,
 *   subtotal: 300.00
 * };
 */
export class UpdateOrderItemDto {

    @IsInt()
    @IsOptional()
    order_id?: number;

    @IsInt()
    @IsOptional()
    product_id?: number;

    @IsInt()
    @IsOptional()
    price?: number;

    @IsInt()
    @IsOptional()
    amount?: number;

    @IsInt()
    @IsOptional()
    subtotal?: number;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of an order item.
 *
 * @property {number} id_order_item - Unique identifier for the order item.
 * @property {number} order_id - Associated order's ID.
 * @property {number} product_id - Associated product's ID.
 * @property {number} amount - amount ordered.
 * @property {number} price - Price per unit.
 * @property {number} subtotal - Total cost for this item.
 * @property {boolean} is_active - Whether the item is active.
 * @property {Date} createdAt - Creation timestamp.
 * @property {Date} updatedAt - Last update timestamp.
 *
 * @example
 * const item: OrderItemResponseDto = {
 *   id_order_item: 10,
 *   order_id: 1,
 *   product_id: 5,
 *   price: 50,
 *   amount: 2,
 *   subtotal: 100,
 *   is_active: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */
export class OrderItemResponseDto {
    @IsInt()
    id_order_item!: number;

    @IsInt()
    order_id!: number;

    @IsInt()
    product_id!: number;

    @IsInt()
    amount!: number;

    @IsInt()
    price!: number;
    
    @IsInt()
    subtotal!: number;

    @IsBoolean()
    is_active!: boolean;

    @IsDate()
    createdAt!: Date;

    @IsDate()
    updatedAt!: Date;
}
