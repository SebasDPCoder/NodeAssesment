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

/**
 * Seeds the `warehouse_products` table with inventory links.
 *
 * Loads data from `warehouse_products.csv` and creates records
 * linking products to warehouses.
 */
export const seedWarehouseProducts = async (): Promise<void> => {
  try {
    const csvPath = path.join(__dirname, "../data/warehouses_product.csv");
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
      const wpData: CreateWarehouseProductDTO = {
        warehouse_id: parseInt(row.warehouse_id),
        product_id: parseInt(row.product_id),
        stock_quantity: parseInt(row.quantity) || 0,
        is_active: row.is_active === "true",
      };

      try {
        await createWarehouseProduct(wpData);
        count++;
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
  } catch (error) {
    console.error("❌ Failed to run warehouse_products seed:", error);
  }
};
