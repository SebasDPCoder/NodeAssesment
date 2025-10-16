// app/src/seeders/07-access.seeder.ts

/**
 * Access Seeder
 * -----------------
 * This file contains the seeder for the Access entity.
 * 
 * It contains:
 * - Initial access credentials for system users.
 * - Admin and seller accounts for testing.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder depends on roles and should be run after role seeder.
 */

import { createAccess } from "../dao/access.dao";
import { CreateAccessDTO } from "../dto/access.dto";
import Role from "../models/role.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import bcrypt from 'bcrypt';

/**
 * Seeds the access table with initial system user credentials.
 * 
 * Creates admin and seller accounts if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedAccesses = async (): Promise<void> => {
  const roles = await Role.findAll();
  
  if (roles.length === 0) {
    console.log("❌ Roles not found. Run role seeder first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/access.csv');
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
            const role = roles.find(r => r.name === row.role);
            if (!role) continue;

            const hashedPassword = await bcrypt.hash(row.password, 10);
            
            const accessData: CreateAccessDTO = {
              role_id: role.id_role,
              document: row.document,
              password: hashedPassword,
              is_active: row.is_active === 'true'
            };

            try {
              await createAccess(accessData);
              count++;
              console.log(`✓ Access created: ${row.username}`);
            } catch (error: any) {
              if (!error.message?.includes('unique constraint')) {
                console.error(`Error creating access ${row.username}:`, error.message);
              }
            }
          }
          console.log(`✅ ${count} accesses processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};