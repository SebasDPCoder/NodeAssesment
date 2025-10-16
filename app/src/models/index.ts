// app/src/models/index.ts

/**
 * index.ts
 * -----------------
 * Main entry point for Sequelize models.
 *
 * Responsibilities:
 * - Import Sequelize instance from configuration.
 * - Import all models from the application.
 * - Apply associations between models.
 * - Provide a utility function to sync the database.
 * - Export Sequelize instance and all models.
 */

import sequelize from "../config/database";

// Import models
import Role from "./role.model";
import Order from "./order.model";
import OrderItem from "./order_item.model";
import OrderStatus from "./order_status.model";
import Customer from "./customer.model";
import Access from "./access.model";
import Address from "./address.model";
import Product from "./product.model";
import User from "./user.model";
import Warehouse from "./warehouse.model";
import WarehouseProduct from "./warehouse_product.model";

/**
 * Synchronize database schema.
 * -----------------
 * - Tests database connection with `sequelize.authenticate()`.
 * - Creates/updates tables according to models with `sequelize.sync()`.
 *
 * Notes:
 * - By default uses `sequelize.sync()`.
 * - Can be modified to `sequelize.sync({ alter: true })` or `sequelize.sync({ force: true })`
 *   depending on migration strategy.
 */

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Connection established with the database.");

    await sequelize.sync();
    console.log(" Tables synchronized correctly.");
  } catch (error) {
    console.error(" Error synchronizing database:", error);
  }
};

/**
 * Export all models and database utilities
 * -----------------
 * Provides a single access point to:
 * - Sequelize instance.
 * - All models.
 * - `syncDB` function.
 */
export {
  sequelize,
  Role,
  Customer,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  syncDB,
  Access,
  Address,
  User,
  Warehouse,
  WarehouseProduct,
};