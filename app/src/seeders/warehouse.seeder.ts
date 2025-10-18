/**
 * Warehouse Seeder
 * -----------------
 * Seeds the `warehouses` table with initial warehouse data.
 */

import { createWarehouse } from "../dao/warehouse.dao";
import { CreateWarehouseDTO } from "../dto/warehouse.dto";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

/**
 * Seeds the `warehouses` table with initial warehouse data.
 *
 * Loads warehouse data from `warehouses.csv` and inserts unique records.
 * Prevents duplicates by handling constraint errors.
 */
export const seedWarehouses = async (): Promise<void> => {
  try {
    const csvPath = path.join(__dirname, "../data/warehouses.csv");
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

    // Process rows
    for (const row of rows) {
      const warehouseData: CreateWarehouseDTO = {
        name: `${row.name} ${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        location: row.location || "",
        is_active: row.is_active === "true",
      };

      try {
        await createWarehouse(warehouseData);
        count++;
      } catch (error: any) {
        if (!error.message?.includes("unique constraint")) {
          console.error(`Error creating warehouse ${row.name}:`, error.message);
        }
      }
    }

    console.log(`✅ ${count} warehouses processed from CSV`);
  } catch (error) {
    console.error("❌ Failed to run warehouse seed:", error);
  }
};
