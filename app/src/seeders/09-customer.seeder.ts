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
import { CreateCustomerDto } from "../dto/customer.dto";
import Address from "../models/address.model";
import Gender from "../models/gender.model";
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
  const addresses = await Address.findAll();
  const genders = await Gender.findAll();

  if (addresses.length === 0 || genders.length === 0) {
    console.log("❌ Addresses or Genders not found. Run those seeders first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/customers.csv');
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
            const gender = genders.find(g => g.name === row.gender);
            const address = addresses[parseInt(row.address_index)];
            
            if (!gender || !address) continue;

            const customerData: CreateCustomerDto = {
              address_id: address.id_address,
              gender_id: gender.id_gender,
              fullname: row.fullname,
              phone: row.phone,
              email: row.email,
              birth_date: new Date(row.birth_date),
              is_active: true
            };

            try {
              await createCustomer(customerData);
              count++;
              if (count % 10 === 0) {
                console.log(`✓ Customers created: ${count}`);
              }
            } catch (error: any) {
              if (!error.message?.includes('unique constraint')) {
                console.error(`Error creating customer ${row.email}:`, error.message);
              }
            }
          }
          console.log(`✅ ${count} customers processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};