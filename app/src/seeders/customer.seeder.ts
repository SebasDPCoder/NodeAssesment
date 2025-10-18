// app/src/seeders/09-customer.seeder.ts

/**
 * Customer Seeder
 * -----------------
 * This file contains the seeder for the Customer entity.
 * 
 * It contains:
 * - Initial customer data for testing purposes.
 * - Sample customers with addresses and genders.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder depends on addresses and genders, should be run after those seeders.
 */

import { createCustomer } from "../dao/customer.dao";
import { CreateCustomerDTO } from "../dto/customer.dto";
import Address from "../models/address.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the customer table with initial test customers.
 * 
 * Creates sample customers if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedCustomers = async (): Promise<void> => {
  try {
    const addresses = await Address.findAll();
    if (addresses.length === 0) {
      console.log("❌ Addresses not found. Run those seeders first.");
      return;
    }
    const csvPath = path.join(__dirname, '../data/customers.csv');
    const rows: any[] = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => rows.push(row))
        .on('end', resolve)
        .on('error', reject);
      });
        
      let count = 0;
      for (const row of rows) {
        const address = addresses[parseInt(row.address_id)];
        if (!address) continue;

        const customerData: CreateCustomerDTO = {
          address_id: address.id_address,
          full_name: row.fullname,
          email: row.email,
          is_active: row.is_active === "true"
        };

        try {
          await createCustomer(customerData);
          count++;
        } catch (error: any) {
          if (!error.message?.includes('unique constraint')) {
            console.error(`Error creating customer ${row.email}:`, error.message);
          }
        }
      }
      console.log(`✅ ${count} customers processed from CSV`);
  } catch (error) {
      console.error("Failed to run customer seed:" + error);
  }
};