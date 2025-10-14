// app/src/seeders/02-role.seeder.ts

/**
 * Role Seeder
 * -----------------
 * This file contains the seeder for the Role entity.
 * 
 * It contains:
 * - Initial role data for the application.
 * - System roles for access control.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder should be run before any entity that depends on roles.
 */

import Role from "../models/role.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the role table with initial system roles.
 * 
 * Creates basic system roles if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedRoles = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/role.csv');
    let count = 0;
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', async (row) => {
        const existing = await Role.findOne({ where: { name: row.name } });
        if (!existing) {
          await Role.create({
            name: row.name,
            is_active: row.is_active === 'true'
          });
          count++;
          console.log(`✓ Role created: ${row.name}`);
        }
      })
      .on('end', () => {
        console.log(`✅ ${count} roles processed from CSV`);
        resolve();
      })
      .on('error', reject);
  });
};