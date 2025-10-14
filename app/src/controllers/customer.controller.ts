/**
* Customers Controller
* -----------------------------------
* Manages all CRUD (Create, Read, Update, Delete) requests
* related to the 'Customer' entity, using the DAO/DTO pattern.
 */

import { Request, Response } from "express";
import * as customerDao from "../dao/customer.dao";
import { CreateCustomerDto, UpdateCustomerDto } from "../dto/customer.dto";

// --- CREATE ---

/**
 * Create a new customer
 * POST /api/customers
 */
export const createCustomer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateCustomerDto = req.body;
    if (typeof dto.birth_date === 'string') {
        dto.birth_date = new Date(dto.birth_date);
    }

    if (!dto.address_id || !dto.birth_date || !dto.email || !dto.fullname || !dto.gender_id) {
      return res.status(200).send("Failed to create customer, fields are require")
    } else {
      const customer = await customerDao.createCustomer(dto);      
      return res.status(201).json(customer);
    }
  } catch (err: any) {
    console.error("Error creating customer:", err.message);
    return res.status(500).json({ error: "Failed to create customer: " + err.message });
  }
};

// --- READ (GET) ---

/**
 * Get customers actives and inactives
 * GET /api/customers
 */
export const getCustomers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const customers = await customerDao.getCustomer();
    return res.json(customers);
  } catch (err: any) {
    console.error("Error getting customers:", err.message);
    return res.status(500).json({ error: "Failed to retrieve customers." });
  }
};

/**
 * Get customer active or inactive by id
 * GET /api/customers/:id
 */
export const getCustomerById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_customer = parseInt(req.params.id, 10);
    if (isNaN(id_customer)) {
        return res.status(400).json({ error: "Invalid customer ID." });
    }

    const customer = await customerDao.getCustomerById(id_customer);
    
    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }
    
    return res.json(customer);
  } catch (err: any) {
    console.error("Error getting customer by ID:", err.message);
    return res.status(500).json({ error: "Failed to retrieve customer." });
  }
};

/**
 * Get only customers actives
 * GET /api/customers/active
 */
export const getActiveCustomers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const customers = await customerDao.getCustomerActive();
    return res.json(customers);
  } catch (err: any) {
    console.error("Error getting active customers:", err.message);
    return res.status(500).json({ error: "Failed to retrieve active customers." });
  }
};

/**
 * Update customer
 * PATCH /api/customers/:id
 */
export const updateCustomer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_customer = parseInt(req.params.id, 10);
    const data: UpdateCustomerDto = req.body;
    
    if (data.birth_date && typeof data.birth_date === 'string') {
      data.birth_date = new Date(data.birth_date);
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).send("Failed to update customer, at least one field is required for update.");
    }

    const updatedCustomer = await customerDao.updateCustomer(id_customer, data);

    if (!updatedCustomer) {
        return res.status(404).json({ error: "Customer not found or no changes were applied." });
    }

    return res.json(updatedCustomer);
  } catch (err: any) {
    console.error("Error updating customer:", err.message);
    return res.status(500).json({ error: "Failed to update customer: " + err.message });
  }
};

/**.
 * SoftDelete, change the state from active to inactive
 * DELETE /api/customers/:id
 */
export const softDeleteCustomer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_customer = parseInt(req.params.id, 10);

    const wasDeleted = await customerDao.softDeleteCustomer(id_customer);

    if (!wasDeleted) {
      return res.status(404).json({ error: "Customer not found or already inactive." });
    }

    return res.status(204).send();
  } catch (err: any) {
    console.error("Error soft-deleting customer:", err.message);
    return res.status(500).json({ error: "Failed to soft delete customer." });
  }
};