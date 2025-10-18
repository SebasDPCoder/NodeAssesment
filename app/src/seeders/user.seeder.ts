// app/src/seeders/10-User.seeder.ts

/**
 * User Seeder
 * -----------------
 * This file contains the seeder for the User entity.
 *
 * It contains:
 * - Initial User data for system users.
 * - Sample Users linked to access credentials.
 * - Logic to prevent duplicate entries.
 *
 * This seeder depends on access and should be run after the access seeder.
 */

import { createUser } from "../dao/user.dao";
import { CreateUserDTO } from "../dto/user.dto";
import Access from "../models/access.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the `users` table with initial profiles.
 *
 * Loads data from `users.csv` and creates records if access exists.
 * Prevents duplicates and handles constraint errors gracefully.
 */
export const seedUsers = async (): Promise<void> => {
  try {

    const csvPath = path.join(__dirname, "../data/users.csv");
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

      const userData: CreateUserDTO = {
        document: row.document,
        full_name: row.full_name,
        email: row.email,
        is_active: row.is_active === "true",
      };

      try {
        await createUser(userData);
        count++;
      } catch (error: any) {
        if (!error.message?.includes("unique constraint")) {
          console.error(`Error creating user ${row.email}:`, error.message);
        }
      }
    }

    console.log(`✅ ${count} users processed from CSV`);
  } catch (error) {
    console.error("❌ Failed to run user seed:", error);
  }
};
