import WarehouseProduct from "../models/warehouse_product.model";
import {
  WarehouseProductDTO,
  CreateWarehouseProductDTO,
  UpdateWarehouseProductDTO,
} from "../dto/warehouse_product.dto";


export const getWarehouseProducts = async (): Promise<WarehouseProductDTO[]> => {
  return await WarehouseProduct.findAll();
};

export const getWarehouseProduct = async (warehouse_id: number,product_id: number): Promise<WarehouseProductDTO | null> => {
  return await WarehouseProduct.findOne({ where: { warehouse_id, product_id } });
};

export const createWarehouseProduct = async (data: CreateWarehouseProductDTO): Promise<WarehouseProductDTO> => {
  return await WarehouseProduct.create(data);
};

export const updateWarehouseProduct = async (warehouse_id: number, product_id: number, data: UpdateWarehouseProductDTO): Promise<[number, WarehouseProductDTO[]]> => {
  return await WarehouseProduct.update(data, { where: { warehouse_id, product_id }, returning: true });
};

export const softDeleteWarehouseProduct = async (id_warehouse_product: number): Promise<boolean> => {
  const [rows] = await WarehouseProduct.update(
    { is_active: false },
    { where: { id_warehouse_product } }
  );

  return rows > 0;
};