import { Product } from "../models";
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from "../dto/product.dto";

export const getProducts = async (): Promise<ProductDTO[]> => {
  return await Product.findAll();
};

export const getProductById = async (id: number): Promise<ProductDTO | null> => {
  return await Product.findByPk(id);
};

export const createProduct = async (data: CreateProductDTO): Promise<ProductDTO> => {
  return await Product.create(data);
};

export const updateProduct = async (
  id: number,
  data: UpdateProductDTO
): Promise<[number, ProductDTO[]]> => {
  return await Product.update(data, { where: { id_product: id }, returning: true });
};

export const softDeleteProduct = async (id_product: number): Promise<boolean> => {
  const [rows] = await Product.update(
    { is_active: false },
    { where: { id_product } }
  );

  return rows > 0;
};