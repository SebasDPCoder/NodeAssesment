import { Product } from "../models";
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from "../dto/product.dto";


export const getProducts = async (): Promise<ProductDTO[]> => {
  return await Product.findAll();
};

export const getProductByCode = async (code: string): Promise<ProductDTO | null> => {
  return await Product.findOne({ where: { code } });
};

export const createProduct = async (data: CreateProductDTO): Promise<ProductDTO> => {
  return await Product.create(data);
};

export const updateProductByCode = async (code: string, data: UpdateProductDTO): Promise<ProductDTO | null> => {
  const product = await Product.findOne({ where: { code } });
  if (!product) return null;

  await product.update(data);
  return product;
};

export const softDeleteProductByCode = async (code: string): Promise<boolean> => {
  const [rowsUpdated] = await Product.update(
    { is_active: false },
    { where: { code } }
  );

  return rowsUpdated > 0;
};
