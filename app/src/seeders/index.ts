// app/src/seeders/index.ts

/**
 * Seeders Index
 * -----------------
 * Main entry point for database seeding operations.
 * 
 * Executes all seeders in the correct order to maintain referential integrity.
 */


import { seedRoles } from "./role.seeder";
import { seedWarehouses } from "./warehouse.seeder";
import { seedWarehouseProducts } from "./warehouse_product.seeder";
import { seedOrderStatus } from "./order_status.seeder";
import { seedAddresses } from "./address.seeder";
import { seedAccesses } from "./access.seeder";
import { seedProducts } from "./product.seeder";
import { seedCustomers } from "./customer.seeder";
import { seedUsers } from "./user.seeder";
import { seedOrders } from "./orders.seeder";
import { seedOrderItems } from "./order_item.seeder";


/**
 * Run all seeders in correct order
 */
export const runAllSeeders = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Base entities (no dependencies);
    await seedRoles();
    await seedWarehouses();
    await seedOrderStatus();
    await seedAddresses();

    // Dependent entities
    await seedAccesses(); // depends on roles
    await seedProducts(); // depends on categories
    await seedCustomers(); // depends on addresses
    await seedUsers(); // depends on access
    await seedOrders(); // depends on customers, order statuses
    await seedOrderItems(); // depends on orders and products
    await seedWarehouseProducts(); // depends on warehouses and products
    
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
  seedWarehouses,
  seedOrderStatus,
  seedAddresses,
  seedAccesses,
  seedProducts,
  seedCustomers,
  seedUsers,
  seedOrders,
  seedOrderItems,
  seedWarehouseProducts,
};