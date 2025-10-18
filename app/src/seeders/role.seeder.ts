/**
 * Role Seeder
 * -----------------
 * This file contains the seeder for the Role entity.
 * 
 * It contains
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
  try {
    const csvPath = path.join(__dirname, "../data/roles.csv");
    const rows: any[] = [];
    
    // 1️⃣ Primero leer el CSV completo
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
    });
    
    // 2️⃣ Luego procesar los datos secuencialmente
    let count = 0;
    for (const row of rows) {
      const existing = await Role.findOne({ where: { name: row.name } });
      if (!existing) {
        await Role.create({
          name: row.name,
          is_active: row.is_active === "true",
        });
        count++;
      }
    }
    
    console.log(`✅ ${count} roles processed from CSV`);
  } catch (error) {
    console.error("Failed to run Role seed:"+ error);
  }
  };
