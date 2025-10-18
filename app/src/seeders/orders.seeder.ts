/**
 * Orders Seeder
 * -----------------
 * This file contains the seeder for the Orders entity.
 * 
 * It contains:
 * - Initial order data for testing purposes.
 * - Sample orders with customers and payment methods.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder depends on customers, payment methods, and order statuses.
 */

import { createOrder } from "../dao/order.dao";
import { CreateOrderDTO } from "../dto/order.dto";
import Customer from "../models/customer.model";
import OrderStatus from "../models/order_status.model";
import Warehouse from "../models/warehouse.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the `orders` table with initial test orders.
 * 
 * Loads order data from a CSV file and creates records
 * if the corresponding customer, status, and warehouse exist.
 * Prevents duplicates and handles errors gracefully.
 */
export const seedOrders = async (): Promise<void> => {
  try {
    const customers = await Customer.findAll();
    const orderStatuses = await OrderStatus.findAll();
    const warehouses = await Warehouse.findAll();

    if (customers.length === 0 || orderStatuses.length === 0 || warehouses.length === 0) {
      console.log("❌ Required data not found. Run customer, warehouse and order status seeders first.");
      return;
    }

    const csvPath = path.join(__dirname, "../data/orders.csv");
    const rows: any[] = [];

    // Load CSV data
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    let count = 0;

    // Process each order row
    for (const row of rows) {
      const customer = customers[parseInt(row.customer_id)];
      const orderStatus = orderStatuses.find((os) => os.id_order_status === parseInt(row.order_status_id));
      const warehouse = warehouses[parseInt(row.warehouse_id)];

      if (!customer || !orderStatus || !warehouse) continue;

      const orderData: CreateOrderDTO = {
        customer_id: customer.id_customer,
        order_status_id: orderStatus.id_order_status,
        warehouse_id: warehouse.id_warehouse,
        is_active: row.is_active === "true",
      };

      try {
        await createOrder(orderData);
        count++;
      } catch (error: any) {
        if (!error.message?.includes("unique constraint")) {
          console.error(`Error creating order for customer ${customer.id_customer}:`, error.message);
        }
      }
    }

    console.log(`✅ ${count} orders processed from CSV`);
  } catch (error) {
    console.error("❌ Failed to run order seed:", error);
  }
};
