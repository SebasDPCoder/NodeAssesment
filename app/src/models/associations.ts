// app/src/models/associations.ts

/**
 * associations
 * -----------------
 * This file defines all the Sequelize associations (relationships) 
 * between the models in the application.
 *
 * It contains:
 * - One-to-Many relationships. 
 * - One-to-One relationships.
 * - Many-to-Many through intermediate tables .
 *
 * Associations allow Sequelize to understand how models are linked 
 * and enable the use of `include` in queries for eager loading.
 *
 * This file should be imported and executed after all models are initialized.
 */
import Role from "./role.model";
import Access from "./access.model";
import Customer from "./customer.model";
import Address from "./address.model";
import User from "./user.model";
import Product from "./product.model";
import Order from "./order.model";
import OrderStatus from "./order_status.model";
import OrderItem from "./order_item.model";
import Warehouse from "./warehouse.model";
import WarehouseProduct from "./warehouse_product.model";


/**
 * Initializes all model associations.
 *
 * Each association is defined using Sequelize methods:
 * - `hasMany`: One-to-Many relationship.
 * - `belongsTo`: Many-to-One relationship.
 * - `hasOne`: One-to-One relationship.
 *
 * Aliases (`as`) are defined to make query includes more readable.
 *
 * Example:
 * ```ts
 * Role.hasMany(Access, { foreignKey: "role_id", as: "accesses" });
 * ```
 */

export const applyAssociations = () => {
  /**
   * Role ↔ Access ↔ User
   */
  Role.hasMany(Access, { foreignKey: "role_id", as: "accesses" });
  Access.belongsTo(Role, { foreignKey: "role_id", as: "role" });

  Access.hasOne(User, { foreignKey: "access_id", as: "user" });
  User.belongsTo(Access, { foreignKey: "access_id", as: "access" });

  /**
   * Address ↔ Customer
   */
  Address.hasMany(Customer, { foreignKey: "address", as: "customers" });
  Customer.belongsTo(Address, { foreignKey: "address", as: "addressInfo" });

  /**
   * Customer ↔ Order ↔ OrderStatus
   */
  Customer.hasMany(Order, { foreignKey: "customer_id", as: "orders" });
  Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

  OrderStatus.hasMany(Order, { foreignKey: "status_id", as: "orders" });
  Order.belongsTo(OrderStatus, { foreignKey: "status_id", as: "status" });

  /**
   * Warehouse ↔ Order
   */
  Warehouse.hasMany(Order, { foreignKey: "warehouse_id", as: "orders" });
  Order.belongsTo(Warehouse, { foreignKey: "warehouse_id", as: "warehouse" });

  /**
   * Order ↔ OrderItems ↔ Product
   */
  Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

  Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems" });
  OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

  /**
   * Warehouse ↔ Products (Many-to-Many through warehouse_products)
   */
  Warehouse.belongsToMany(Product, { through: WarehouseProduct, foreignKey: "warehouse_id", otherKey: "product_id", as: "products" });

  Product.belongsToMany(Warehouse, {through: WarehouseProduct, foreignKey: "product_id", otherKey: "warehouse_id", as: "warehouses"});
};

