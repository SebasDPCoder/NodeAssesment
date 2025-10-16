import Warehouse from "../models/warehouse.model"
import {
  WarehouseDTO,
  CreateWarehouseDTO,
  UpdateWarehouseDTO,
} from "../dto/warehouse.dto";

// Get all warehouses
export const getWarehouses = async (): Promise<WarehouseDTO[]> => {
  return await Warehouse.findAll();
};

// Get warehouse by ID
export const getWarehouseById = async (id: number): Promise<WarehouseDTO | null> => {
  return await Warehouse.findByPk(id);
};

// Create new warehouse
export const createWarehouse = async (data: CreateWarehouseDTO): Promise<WarehouseDTO> => {
  return await Warehouse.create(data);
};

// Update existing warehouse
export const updateWarehouse = async (
  id: number,
  data: UpdateWarehouseDTO
): Promise<[number, WarehouseDTO[]]> => {
  return await Warehouse.update(data, { where: { id_warehouse: id }, returning: true });
};

export const softDeleteWarehouse = async (id_warehouse: number): Promise<boolean> => {
  const [rows] = await Warehouse.update(
    { is_active: false },
    { where: { id_warehouse } }
  );

  return rows > 0;
};
