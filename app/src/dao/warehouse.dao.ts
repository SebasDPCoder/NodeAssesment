import Warehouse from "../models/warehouse.model"
import {
  WarehouseDTO,
  CreateWarehouseDTO,
  UpdateWarehouseDTO,
} from "../dto/warehouse.dto";


export const getWarehouses = async (): Promise<WarehouseDTO[]> => {
  return await Warehouse.findAll();
};

export const getWarehouseById = async (id: number): Promise<WarehouseDTO | null> => {
  return await Warehouse.findByPk(id);
};

export const createWarehouse = async (data: CreateWarehouseDTO): Promise<WarehouseDTO> => {
  return await Warehouse.create(data);
};

export const updateWarehouse = async (id: number, data: UpdateWarehouseDTO): Promise<[number, WarehouseDTO[]]> => {
  return await Warehouse.update(data, { where: { id_warehouse: id }, returning: true });
};

export const softDeleteWarehouse = async (id_warehouse: number): Promise<boolean> => {
  const [rows] = await Warehouse.update(
    { is_active: false },
    { where: { id_warehouse } }
  );

  return rows > 0;
};
