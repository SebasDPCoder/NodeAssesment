// app/src/seeders/06-address.seeder.ts

/**
 * Address Seeder
 * -----------------
 * This file contains the seeder for the Address entity.
 * 
 * It contains:
 * - Initial address data for Colombian cities.
 * - Sample addresses for testing purposes.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder should be run before any entity that depends on addresses.
 */

import Address from "../models/address.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the address table with initial Colombian addresses.
 * 
 * Creates sample addresses if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedAddresses = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/address.csv');
    let count = 0;
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', async (row) => {
        const existing = await Address.findOne({ 
          where: { 
            street: row.street, 
            number: row.number,
            city: row.city 
          } 
        });
        if (!existing) {
          await Address.create({
            country: row.country,
            city: row.city,
            department: row.department,
            street: row.street,
            number: row.number,
            postal_code: row.postal_code,
            is_active: row.is_active === 'true'
          });
          count++;
          console.log(`✓ Address created: ${row.street} ${row.number}, ${row.city}`);
        }
      })
      .on('end', () => {
        console.log(`✅ ${count} addresses processed from CSV`);
        resolve();
      })
      .on('error', reject);
  });
};