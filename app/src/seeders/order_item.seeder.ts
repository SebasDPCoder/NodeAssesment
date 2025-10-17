// app/src/seeders/12-order_item.seeder.ts

/**
 * Order Item Seeder
 * -----------------
 * This file contains the seeder for the OrderItem entity.
 * 
 * It contains:
 * - Initial order item data linking products to orders.
 * - Sample order items with quantities and pricing.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder depends on orders and products.
 */

import { createOrderItem } from "../dao/order_item.dao";
import { CreateOrderItemDTO } from "../dto/order_item.dto";
import Order from "../models/order.model";
import Product from "../models/product.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the order item table with initial order-product relationships.
 * 
 * Creates sample order items if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedOrderItems = async (): Promise<void> => {
  const orders = await Order.findAll();
  const products = await Product.findAll();

  console.log(orders);
  console.log(products);
    

  if (orders.length === 0 || products.length === 0) {
    console.log("❌ Orders or products not found. Run orders and products seeders first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/order_items.csv');
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
            const order = orders[parseInt(row.id_order)];
            const product = products[parseInt(row.id_product)];
            
            if (!order || !product) continue;

            const orderItemData: CreateOrderItemDTO = {
              order_id: order.id_order,
              product_id: product.id_product,
              quantity: row.quantity,
              is_active: row.is_active === "true",
            };

            try {
              await createOrderItem(orderItemData);
              count++;
              if (count % 100 === 0) {
                console.log(`✓ Order Items created: ${count}`);
              }
            } catch (error: any) {
              if (!error.message?.includes('unique constraint')) {
                console.error(`Error creating order item:`, error.message);
              }
            }
          }
          console.log(`✅ ${count} order items processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};