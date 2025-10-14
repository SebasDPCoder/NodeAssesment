/**
 * Product DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `Product` entity.
 *
 * The DAO (Data Access Object) pattern encapsulates the database access logic,
 * separating it from the controllers and ensuring better code organization.
 *
 * Defined functions:
 *  - createProduct: Inserts a new product into the database.
 *  - getProducts: Retrieves all non-deleted products.
 *  - getProductById: Retrieves a product by its ID.
 *  - updateProduct: Updates an existing product.
 *  - softDeleteProduct: Performs a logical deletion by setting `is_deleted` to true.
 */

import Product from "../models/product.model";
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from "../dto/product.dto";

/**
 * Inserts a new product into the database.
 *
 * @param data - Required data to create the product (CreateProductDto).
 * @returns {Promise<ProductResponseDto>} - Created product.
 */
export const createProduct = async (data: CreateProductDto): Promise<ProductResponseDto> => {
  const product = await Product.create({
    code: data.code,
    name: data.name,
    price: data.price,
    description: data.description,
    is_deleted: data.is_deleted ?? false, // default value if not provided
  });

  return product.toJSON() as ProductResponseDto;
};

/**
 * Retrieves all non-deleted products from the `products` table.
 *
 * @returns {Promise<ProductResponseDto[]>} - List of products.
 */
export const getProducts = async (): Promise<ProductResponseDto[]> => {
  const products = await Product.findAll({
    where: { is_deleted: false },
  });

  return products.map((p: any) => p.toJSON() as ProductResponseDto);
};

/**
 * Retrieves a product by its ID.
 *
 * @param id_product - Unique identifier of the product.
 * @returns {Promise<ProductResponseDto | null>} - Found product or null if it doesn't exist.
 */
export const getProductById = async (id_product: number): Promise<ProductResponseDto | null> => {
  const product = await Product.findOne({
    where: { id_product, is_deleted: false },
  });

  return product ? (product.toJSON() as ProductResponseDto) : null;
};

/**
 * Updates an existing product.
 *
 * @param id_product - Unique identifier of the product.
 * @param data - Data to update (UpdateProductDto).
 * @returns {Promise<ProductResponseDto | null>} - Updated product or null if it doesn't exist.
 */
export const updateProduct = async (
  id_product: number,
  data: UpdateProductDto
): Promise<ProductResponseDto | null> => {
  const [rows, products] = await Product.update(data, {
    where: { id_product, is_deleted: false },
    returning: true,
  });

  if (rows > 0 && products.length > 0) {
    return products[0].toJSON() as ProductResponseDto;
  }
  return null;
};

/**
 * Performs a logical deletion of a product by setting `is_deleted` to true.
 *
 * @param id_product - Unique identifier of the product.
 * @returns {Promise<boolean>} - true if successfully marked as deleted, false otherwise.
 */
export const softDeleteProduct = async (id_product: number): Promise<boolean> => {
  const [rowsAffected] = await Product.update(
    { is_deleted: true },
    { where: { id_product, is_deleted: false } }
  );

  return rowsAffected > 0;
};
