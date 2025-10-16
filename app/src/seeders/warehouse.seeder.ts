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

export const seedWarehouses = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, "../data/warehouses.csv");
    const rows: any[] = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        let count = 0;
        try {
          for (const row of rows) {
            const warehouseData: CreateWarehouseDTO = {
              name: `${row.name} ${Math.random().toString(36).substr(2, 4).toUpperCase()}`, // unique
              location: row.location || "",
              is_active: true,
            };

            try {
              await createWarehouse(warehouseData);
              count++;
              if (count % 50 === 0) console.log(`✓ Warehouses created: ${count}`);
            } catch (error: any) {
              if (!error.message?.includes("unique constraint")) {
                console.error(`Error creating warehouse ${row.name}:`, error.message);
              }
            }
          }

          console.log(`✅ ${count} warehouses processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", reject);
  });
};
