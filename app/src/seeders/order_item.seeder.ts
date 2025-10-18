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
 * Seeds the `order_items` table with initial data.
 * 
 * Loads order item data from a CSV file and creates records
 * if the corresponding order and product exist.
 * Prevents duplicates and handles unique constraint errors gracefully.
 */
export const seedOrderItems = async (): Promise<void> => {
  try {
    const orders = await Order.findAll();
    const products = await Product.findAll();

    if (orders.length === 0 || products.length === 0) {
      console.log("❌ Orders or products not found. Run those seeders first.");
      return;
    }

    const csvPath = path.join(__dirname, "../data/order_items.csv");
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

    // Process each row
    for (const row of rows) {
      const order = orders[parseInt(row.order_id)];
      const product = products[parseInt(row.product_id)];

      if (!order || !product) continue;

      const orderItemData: CreateOrderItemDTO = {
        order_id: order.id_order,
        product_id: product.id_product,
        quantity: parseInt(row.quantity),
        is_active: row.is_active === "true",
      };

      try {
        await createOrderItem(orderItemData);
        count++;
      } catch (error: any) {
        if (!error.message?.includes("unique constraint")) {
          console.error(`Error creating order item for order ${order.id_order}:`, error.message);
        }
      }
    }
    console.log(`✅ ${count} order items processed from CSV`);
  } catch (error) {
    console.error("❌ Failed to run order items seed:", error);
  }
};
