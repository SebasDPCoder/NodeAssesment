// app/src/seeders/11-orders.seeder.ts

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
 * Seeds the orders table with initial test orders.
 * 
 * Creates sample orders if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedOrders = async (): Promise<void> => {
  const customers = await Customer.findAll();
  const orderStatuses = await OrderStatus.findAll();
  const warehouses = await Warehouse.findAll();

  if (customers.length === 0 || orderStatuses.length === 0 || warehouses.length === 0) {
    console.log("❌ Required data not found. Run customer,warehouse and order status seeders first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/orders.csv');
    const rows: any[] = [];
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', async () => {
        let count = 0;
        try {
          for (const row of rows) {
            const customer = customers[parseInt(row.customer_index)];
            const orderStatus = orderStatuses.find(os => os.name === row.order_status);
            const warehouse = warehouses[parseInt(row.warehouse_index)]
            
            if (!customer || !orderStatus || !warehouse) continue;

            const orderData: CreateOrderDTO = {
              customer_id: customer.id_customer,
              order_status_id: orderStatus.id_order_status,
              warehouse_id: warehouse.id_warehouse,
              is_active: true
            };

            try {
              await createOrder(orderData);
              count++;
              if (count % 50 === 0) {
                console.log(`✓ Orders created: ${count}`);
              }
            } catch (error: any) {
              if (!error.message?.includes('unique constraint')) {
                console.error(`Error creating order:`, error.message);
              }
            }
          }
          console.log(`✅ ${count} orders processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};