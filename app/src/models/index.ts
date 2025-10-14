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
import Seller from "./seller.model";
import Role from "./role.model";
import PaymentMethod from "./payment_method.model";
import Category from "./category.model";
import OrderStatus from "./order_status.model";
import Gender from "./gender.model";
import Customer from "./customer.model";
import Access from "./access.model";
import Address from "./address.model";
import Product from "./product.model";
import Order from "./order.model";
import OrderPayment from "./order_payment.model";
import OrderItem from "./order_item.model";

import {applyAssociations} from "./associations";
/**
 * Apply associations between models.
 * -----------------
 * This step connects models based on their
 * foreign keys and logical relationships.
 */
applyAssociations()
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
  Seller,
  Role,
  PaymentMethod,
  Category,
  Customer,
  Gender,
  Order,
  OrderItem,
  OrderPayment,
  OrderStatus,
  Product,
  syncDB,
  Access,
  Address,
};