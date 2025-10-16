import { Request, Response } from "express";
import * as warehouseProductDao from "../dao/warehouse_product.dao";
import { CreateWarehouseProductDTO } from "../dto/warehouse_product.dto";

/**
 * Links a product to a warehouse with a specific quantity.
 *
 * @param req - HTTP request object, expected to contain { warehouse_id, product_id, quantity } in the body.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the created warehouse-product relation.
 *
 * @example
 * POST /api/warehouse-products
 * {
 *   "warehouse_id": 1,
 *   "product_id": 5,
 *   "quantity": 100
 * }
 */
export const addProductToWarehouse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateWarehouseProductDTO = req.body;
    const relation = await warehouseProductDao.createWarehouseProduct(dto);
    return res.status(201).json(relation);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves all product-warehouse relations.
 *
 * @param _req - HTTP request object (not used).
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns an array of warehouse-product records.
 *
 * @example
 * GET /api/warehouse-products
 */
export const getWarehouseProducts = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const relations = await warehouseProductDao.getWarehouseProducts();
    return res.json(relations);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Updates the quantity of a product in a specific warehouse.
 *
 * @param req - HTTP request object, expected to contain `warehouse_id` and `product_id` as route parameters.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns the updated record or 404 if not found.
 *
 * @example
 * PUT /api/warehouse-products/1/5
 * {
 *   "quantity": 200
 * }
 */
export const updateWarehouseProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const warehouse_id = parseInt(req.params.warehouse_id, 10);
    const product_id = parseInt(req.params.product_id, 10);
    const { quantity } = req.body;
    const updated = await warehouseProductDao.updateWarehouseProduct(warehouse_id, product_id, quantity);
    if (updated) {
      return res.json(updated);
    }
    return res.status(404).json({ error: "Relation not found" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Removes a product from a warehouse (soft delete or unlink).
 *
 * @param req - HTTP request object, expected to contain `warehouse_id` and `product_id` as route parameters.
 * @param res - HTTP response object.
 *
 * @returns {Promise<Response>} - Returns a success message or 404 if not found.
 *
 * @example
 * DELETE /api/warehouse-products/1/5
 */
export const softDeleteWarehouseProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_warehouse_product = parseInt(req.params.id_product, 10);
    const deleted = await warehouseProductDao.softDeleteWarehouseProduct(id_warehouse_product);
    if (deleted) {
      return res.json({ message: "Product removed from warehouse successfully" });
    }
    return res.status(404).json({ error: "Relation not found" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

