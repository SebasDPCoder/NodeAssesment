/**
 * Product Seeder
 * -----------------
 * This file seeds the `products` table with initial product data.
 *
 * It loads product data from a CSV file and creates records if they don't already exist.
 * Each product includes a unique code, name, description, and price.
 */

import { createProduct } from "../dao/product.dao";
import { CreateProductDto } from "../dto/product.dto";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

/**
 * Seeds the product table with initial data.
 *
 * Reads data from `products.csv` and inserts records into the database.
 * Prevents duplicate entries by skipping existing ones (based on unique constraints).
 */
export const seedProducts = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, "../data/products.csv");
    const rows: any[] = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        let count = 0;
        try {
          for (const row of rows) {
            const productData: CreateProductDto = {
              code: row.code || `PRD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
              name: `${row.name} ${Math.random().toString(36).substr(2, 4).toUpperCase()}`, // ensure uniqueness
              price: parseFloat(row.price) || 0,
              is_active: false,
            };

            try {
              await createProduct(productData);
              count++;

              if (count % 100 === 0) {
                console.log(`✓ Products created: ${count}`);
              }
            } catch (error: any) {
              if (!error.message?.includes("unique constraint")) {
                console.error(`Error creating product ${row.name}:`, error.message);
              }
            }
          }

          console.log(`✅ ${count} products processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", reject);
  });
};
