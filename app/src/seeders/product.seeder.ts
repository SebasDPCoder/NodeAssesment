/**
 * Product Seeder
 * -----------------
 * This file seeds the `products` table with initial product data.
 *
 * It loads product data from a CSV file and creates records if they don't already exist.
 * Each product includes a unique code, name, description, and price.
 */

import { createProduct } from "../dao/product.dao";
import { CreateProductDTO } from "../dto/product.dto";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

/**
 * Seeds the `products` table with initial data.
 *
 * Loads product data from `products.csv` and inserts records into the database.
 * Prevents duplicate entries by handling unique constraint errors.
 */
export const seedProducts = async (): Promise<void> => {
  try {
    const csvPath = path.join(__dirname, "../data/products.csv");
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
      const productData: CreateProductDTO = {
        code: row.code || `PRD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        name: `${row.name} ${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        price: parseFloat(row.price) || 0,
        is_active: row.is_active === "true",
      };

      try {
        await createProduct(productData);
        count++;
      } catch (error: any) {
        if (!error.message?.includes("unique constraint")) {
          console.error(`Error creating product ${row.name}:`, error.message);
        }
      }
    }

    console.log(`✅ ${count} products processed from CSV`);
  } catch (error) {
    console.error("❌ Failed to run product seed:", error);
  }
};
