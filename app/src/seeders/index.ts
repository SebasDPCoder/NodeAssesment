// app/src/seeders/index.ts

/**
 * Seeders Index
 * -----------------
 * Main entry point for database seeding operations.
 * 
 * Executes all seeders in the correct order to maintain referential integrity.
 */


import { seedRoles } from "./role.seeder";

import { seedOrderStatus } from "./04-orderStatus.seeder";

import { seedAddresses } from "./06-address.seeder";
import { seedAccesses } from "./07-access.seeder";
import { seedProducts } from "./08-product.seeder";
import { seedCustomers } from "./09-customer.seeder";
import { seedUsers } from "./user.seeder";
import { seedOrders } from "./11-orders.seeder";
import { seedOrderItems } from "./12-order_item.seeder";
import { seedOrderPayments } from "./13-order_payment.seeder";

/**
 * Run all seeders in correct order
 */
export const runAllSeeders = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Base entities (no dependencies);
    await seedRoles();
    await seedOrderStatus();
    await seedAddresses();
    
    // Dependent entities
    await seedAccesses(); // depends on roles
    await seedProducts(); // depends on categories
    await seedCustomers(); // depends on addresses and genders
    await seedUsers(); // depends on access
    await seedOrders(); // depends on customers, payment methods, order statuses
    await seedOrderItems(); // depends on orders and products
    await seedOrderPayments(); // depends on orders and payment methods
    
    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
};

/**
 * Run individual seeders
 */
export {
  seedRoles,
  seedOrderStatus,
  seedAddresses,
  seedAccesses,
  seedProducts,
  seedCustomers,
  seedOrders,
  seedOrderItems,
  seedOrderPayments
};