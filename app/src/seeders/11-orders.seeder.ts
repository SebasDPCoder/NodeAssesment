// app/src/seeders/11-orders.seeder.ts

/**
 * Orders Seeder
 * -----------------
 * This file contains the seeder for the Orders entity.
 * 
 * It contains:
 * - Initial order data for testing purposes.
 * - Sample orders with customers and payment methods.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder depends on customers, payment methods, and order statuses.
 */

import { createOrder } from "../dao/order.dao";
import { CreateOrderDto } from "../dto/order.dto";
import Customer from "../models/customer.model";
import Seller from "../models/seller.model";
import PaymentMethod from "../models/payment_method.model";
import OrderStatus from "../models/order_status.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the orders table with initial test orders.
 * 
 * Creates sample orders if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedOrders = async (): Promise<void> => {
  const customers = await Customer.findAll();
  const sellers = await Seller.findAll();
  const paymentMethods = await PaymentMethod.findAll();
  const orderStatuses = await OrderStatus.findAll();

  if (customers.length === 0 || sellers.length === 0 || paymentMethods.length === 0 || orderStatuses.length === 0) {
    console.log("❌ Required data not found. Run customer, seller, payment method, and order status seeders first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/orders.csv');
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
            const customer = customers[parseInt(row.customer_index)];
            const seller = sellers[parseInt(row.seller_index) || 0];
            const paymentMethod = paymentMethods.find(pm => pm.name === row.payment_method);
            const orderStatus = orderStatuses.find(os => os.name === row.order_status);
            
            if (!customer || !seller || !paymentMethod || !orderStatus) continue;

            const orderData: CreateOrderDto = {
              customer_id: customer.id_customer,
              seller_id: seller.id_seller,
              payment_method_id: paymentMethod.id_payment_method,
              order_status_id: orderStatus.id_order_status,
              payment_date: new Date(row.payment_date),
              total: parseFloat(row.total),
              is_active: true
            };

            try {
              await createOrder(orderData);
              count++;
              if (count % 50 === 0) {
                console.log(`✓ Orders created: ${count}`);
              }
            } catch (error: any) {
              if (!error.message?.includes('unique constraint')) {
                console.error(`Error creating order:`, error.message);
              }
            }
          }
          console.log(`✅ ${count} orders processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};