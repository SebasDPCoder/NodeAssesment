// app/src/seeders/04-orderStatus.seeder.ts

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
 * Seeds the order status table with initial workflow statuses.
 * 
 * Creates basic order statuses if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedOrderStatus = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/orderStatus.csv');
    let count = 0;
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', async (row) => {
        const existing = await OrderStatus.findOne({ where: { name: row.name } });
        if (!existing) {
          await OrderStatus.create({ 
            name: row.name,
            is_active: row.is_active === 'true'
          });
          count++;
          console.log(`✓ Order Status created: ${row.name}`);
        }
      })
      .on('end', () => {
        console.log(`✅ ${count} order statuses processed from CSV`);
        resolve();
      })
      .on('error', reject);
  });
};