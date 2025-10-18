/**
 * Order Status Seeder
 * -----------------
 * This file contains the seeder for the OrderStatus entity.
 * 
 * It contains:
 * - Initial order status data for order management.
 * - System statuses for order workflow.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder should be run before any entity that depends on order statuses.
 */

import OrderStatus from "../models/order_status.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the `order_status` table with initial workflow statuses.
 * 
 * Loads status data from a CSV file and creates records if they don't already exist.
 * Prevents duplicates and handles errors gracefully.
 */
export const seedOrderStatus = async (): Promise<void> => {
  try {
    const csvPath = path.join(__dirname, "../data/order_status.csv");
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
      const existing = await OrderStatus.findOne({ where: { name: row.name } });

      if (!existing) {
        try {
          await OrderStatus.create({
            name: row.name,
            is_active: row.is_active === "true",
          });
          count++;
        } catch (error: any) {
          console.error(`Error creating order status "${row.name}":`, error.message);
        }
      }
    }
    console.log(`✅ ${count} order statuses processed from CSV`);
  } catch (error) {
    console.error("❌ Failed to run order status seed:", error);
  }
};
