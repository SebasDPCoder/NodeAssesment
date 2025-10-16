import { Request, Response } from "express";
import * as warehouseDao from "../dao/warehouse.dao";
import { CreateWarehouseDTO } from "../dto/warehouse.dto";

/**
 * Creates a new warehouse in the system.
 *
 * @param req - HTTP request object, expected to contain warehouse data in the body ({ name, location, capacity }).
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the created warehouse in JSON format with status code 201.
 *
 * @example
 * POST /api/warehouses
 * {
 *   "name": "Main Warehouse",
 *   "location": "Bogotá",
 *   "capacity": 5000
 * }
 */
export const createWarehouse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateWarehouseDTO = req.body;
    const warehouse = await warehouseDao.createWarehouse(dto);
    return res.status(201).json(warehouse);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves all warehouses from the database.
 *
 * @param _req - HTTP request object (not used in this case).
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns an array of warehouses in JSON format.
 *
 * @example
 * GET /api/warehouses
 */
export const getWarehouses = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const warehouses = await warehouseDao.getWarehouses();
    return res.json(warehouses);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a single warehouse by its ID.
 *
 * @param req - HTTP request object, expected to contain `id_warehouse` as a route parameter.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the warehouse in JSON format, or 404 if not found.
 *
 * @example
 * GET /api/warehouses/1
 */
export const getWarehouseById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_warehouse = parseInt(req.params.id_warehouse, 10);
    const warehouse = await warehouseDao.getWarehouseById(id_warehouse);
    if (warehouse) {
      return res.json(warehouse);
    }
    return res.status(404).json({ error: "Warehouse not found" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Updates a warehouse by its ID.
 *
 * @param req - HTTP request object, expected to contain `id_warehouse` as a route parameter and update data in the body.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the updated warehouse in JSON format, or 404 if not found.
 *
 * @example
 * PUT /api/warehouses/1
 * {
 *   "name": "Updated Warehouse",
 *   "capacity": 6000
 * }
 */
export const updateWarehouse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_warehouse = parseInt(req.params.id_warehouse, 10);
    const dto = req.body;
    const updatedWarehouse = await warehouseDao.updateWarehouse(id_warehouse, dto);
    if (updatedWarehouse) {
      return res.json(updatedWarehouse);
    }
    return res.status(404).json({ error: "Warehouse not found" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Soft deletes a warehouse by marking it as inactive.
 *
 * @param req - HTTP request object, expected to contain `id_warehouse` as a route parameter.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns a success message, or 404 if not found.
 *
 * @example
 * DELETE /api/warehouses/1
 */
export const softDeleteWarehouse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_warehouse = parseInt(req.params.id_warehouse, 10);
    const deleted = await warehouseDao.softDeleteWarehouse(id_warehouse);
    if (deleted) {
      return res.json({ message: "Warehouse deleted successfully" });
    }
    return res.status(404).json({ error: "Warehouse not found" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
