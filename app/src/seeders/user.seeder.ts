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
import { CreateUserDto } from "../dto/user.dto";
import Access from "../models/access.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the User table with initial User profiles.
 *
 * Creates User profiles if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedUsers = async (): Promise<void> => {
  const accesses = await Access.findAll();
  if (accesses.length === 0) {
    console.log("❌ Access accounts not found. Run access seeder first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/Users.csv');
    const rows: any[] = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', async () => {
        let count = 0;
        try {
          for (const row of rows) {
            const access = accesses.find(a => a.document === row.document);
            if (!access) continue;

            const UserData: CreateUserDto = {
              access_id: access.id_access,
              fullname: row.fullname,
              email: row.email,
              is_active: true
            };

            try {
              await createUser(UserData);
              count++;
              console.log(`✓ user created: ${row.fullname}`);
            } catch (error: any) {
              if (!error.message?.includes('unique constraint')) {
                console.error(`Error creating user ${row.email}:`, error.message);
              }
            }
          }
          console.log(`✅ ${count} Users processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};