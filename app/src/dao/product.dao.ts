// app/src/dao/product.dao.ts

/**
 * Product DAO (Data Access Object)
 * --------------------------------
 * This layer abstracts all direct database interactions
 * related to the `Product` entity.
 *
 * Updated:
 *  - All operations now use the `code` (string) attribute instead of `id_product`.
 */

import { Product } from "../models";
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from "../dto/product.dto";

/**
 * Retrieves all products from the database.
 *
 * @returns {Promise<ProductDTO[]>} - List of all products.
 */
export const getProducts = async (): Promise<ProductDTO[]> => {
  return await Product.findAll();
};

/**
 * Retrieves a product by its unique code.
 *
 * @param code - Unique string identifier of the product.
 * @returns {Promise<ProductDTO | null>} - The found product or null if not found.
 */
export const getProductByCode = async (code: string): Promise<ProductDTO | null> => {
  return await Product.findOne({ where: { code } });
};

/**
 * Creates a new product.
 *
 * @param data - Product data to insert.
 * @returns {Promise<ProductDTO>} - The created product.
 */
export const createProduct = async (data: CreateProductDTO): Promise<ProductDTO> => {
  return await Product.create(data);
};

/**
 * Updates a product by its code.
 *
 * @param code - Unique string identifier of the product.
 * @param data - Data to update.
 * @returns {Promise<ProductDTO | null>} - The updated product or null if not found.
 */
export const updateProductByCode = async (
  code: string,
  data: UpdateProductDTO
): Promise<ProductDTO | null> => {
  const product = await Product.findOne({ where: { code } });
  if (!product) return null;

  await product.update(data);
  return product;
};

/**
 * Performs a soft delete of a product (marks it as inactive).
 *
 * @param code - Unique string identifier of the product.
 * @returns {Promise<boolean>} - True if a record was updated, false otherwise.
 */
export const softDeleteProductByCode = async (code: string): Promise<boolean> => {
  const [rowsUpdated] = await Product.update(
    { is_active: false },
    { where: { code } }
  );

  return rowsUpdated > 0;
};
