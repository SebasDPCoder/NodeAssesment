/**
 * WarehouseProduct Seeder
 * ----------------------
 * Seeds the `warehouse_products` table with initial stock data.
 * Each row links a product to a warehouse with a quantity.
 */

import { createWarehouseProduct } from "../dao/warehouse_product.dao";
import { CreateWarehouseProductDTO } from "../dto/warehouse_product.dto";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

export const seedWarehouseProducts = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, "../data/warehouse_products.csv");
    const rows: any[] = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        let count = 0;
        try {
          for (const row of rows) {
            const wpData: CreateWarehouseProductDTO = {
              warehouse_id: parseInt(row.warehouse_id),
              product_id: parseInt(row.product_id),
              stock_quantity: parseInt(row.quantity) || 0,
              is_active: true
            };

            try {
              await createWarehouseProduct(wpData);
              count++;
              if (count % 50 === 0) console.log(`✓ WarehouseProducts created: ${count}`);
            } catch (error: any) {
              if (!error.message?.includes("unique constraint")) {
                console.error(
                  `Error linking product ${row.product_id} to warehouse ${row.warehouse_id}:`,
                  error.message
                );
              }
            }
          }

          console.log(`✅ ${count} warehouse_products processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", reject);
  });
};
