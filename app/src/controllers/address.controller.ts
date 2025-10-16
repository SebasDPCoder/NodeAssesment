/**
 * Address Controller
 * -----------------------------------
 * Manages all CRUD (Create, Read, Update, Delete) requests
 * related to the 'Address' entity, using the DAO/DTO pattern.
 */

import { Request, Response } from "express";
import * as addressDao from "../dao/address.dao";
import { CreateAddressDTO, UpdateAddressDTO } from "../dto/address.dto";

// --- CREATE ---

/**
 * Create a new address
 * POST /api/addresses
 */
export const createAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateAddressDTO = req.body;

    if (!dto || Object.keys(dto).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty." });
    }

    if (!dto.country || typeof dto.country !== "string" || dto.country.trim() === "") {
      return res.status(400).json({ error: "Country is required and must be a non-empty string." });
    }
    if (!dto.department || typeof dto.department !== "string" || dto.department.trim() === "") {
      return res.status(400).json({ error: "Department is required and must be a non-empty string." });
    }
    if (!dto.city || typeof dto.city !== "string" || dto.city.trim() === "") {
      return res.status(400).json({ error: "City is required and must be a non-empty string." });
    }
    if (!dto.postal_code || typeof dto.postal_code !== "string" || dto.postal_code.trim() === "") {
      return res.status(400).json({ error: "Postal code is required and must be a non-empty string." });
    }
    if (!dto.street || typeof dto.street !== "string" || dto.street.trim() === "") {
      return res.status(400).json({ error: "Street is required and must be a non-empty string." });
    }
    if (!dto.number || typeof dto.number !== "string" || dto.number.trim() === "") {
      return res.status(400).json({ error: "Number is required and must be a non-empty string." });
    }

    const address = await addressDao.createAddress(dto);
    return res.status(201).json(address);
  } catch (err: any) {
    console.error("Error creating address:", err.message);
    return res.status(500).json({ error: "Failed to create address: " + err.message });
  }
};

// --- READ (GET) ---

export const getActiveAddress = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const addresses = await addressDao.getActiveAddress();
    return res.json(addresses);
  } catch (err: any) {
    console.error("Error getting active addresses:", err.message);
    return res.status(500).json({ error: "Failed to retrieve active addresses." });
  }
};

export const getAddressById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_address = parseInt(req.params.id, 10);
    if (isNaN(id_address)) {
      return res.status(400).json({ error: "Invalid address ID." });
    }

    const address = await addressDao.getAddressById(id_address);
    if (!address) {
      return res.status(404).json({ error: "Address not found." });
    }

    return res.json(address);
  } catch (err: any) {
    console.error("Error getting address by ID:", err.message);
    return res.status(500).json({ error: "Failed to retrieve address." });
  }
};

// --- UPDATE ---

/**
 * Update address
 * PATCH /api/addresses/:id
 */
export const updateAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_address = parseInt(req.params.id, 10);
    if (isNaN(id_address)) {
      return res.status(400).json({ error: "Invalid address ID." });
    }

    const data: UpdateAddressDTO = req.body;


    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty. At least one field is required." });
    }


    if (data.country !== undefined && (typeof data.country !== "string" || data.country.trim() === "")) {
      return res.status(400).json({ error: "Country must be a non-empty string." });
    }
    if (data.department !== undefined && (typeof data.department !== "string" || data.department.trim() === "")) {
      return res.status(400).json({ error: "Department must be a non-empty string." });
    }
    if (data.city !== undefined && (typeof data.city !== "string" || data.city.trim() === "")) {
      return res.status(400).json({ error: "City must be a non-empty string." });
    }
    if (data.postal_code !== undefined && (typeof data.postal_code !== "string" || data.postal_code.trim() === "")) {
      return res.status(400).json({ error: "Postal code must be a non-empty string." });
    }
    if (data.street !== undefined && (typeof data.street !== "string" || data.street.trim() === "")) {
      return res.status(400).json({ error: "Street must be a non-empty string." });
    }
    if (data.number !== undefined && (typeof data.number !== "string" || data.number.trim() === "")) {
      return res.status(400).json({ error: "Number must be a non-empty string." });
    }
    if (data.is_active !== undefined && typeof data.is_active !== "boolean") {
      return res.status(400).json({ error: "is_active must be a boolean value." });
    }

    const updated = await addressDao.updateAddress(id_address, data);
    if (!updated) {
      return res.status(404).json({ error: "Address not found or no changes were applied." });
    }

    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating address:", err.message);
    return res.status(500).json({ error: "Failed to update address: " + err.message });
  }
};

// --- SOFT DELETE ---

export const softDeleteAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_address = parseInt(req.params.id, 10);
    if (isNaN(id_address)) {
      return res.status(400).json({ error: "Invalid address ID." });
    }

    const wasDeleted = await addressDao.softDeleteAddress(id_address);
    if (!wasDeleted) {
      return res.status(404).json({ error: "Address not found or already inactive." });
    }

    return res.status(204).send();
  } catch (err: any) {
    console.error("Error soft-deleting address:", err.message);
    return res.status(500).json({ error: "Failed to soft delete address." });
  }
};
