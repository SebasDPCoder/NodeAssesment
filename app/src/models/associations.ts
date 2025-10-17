// app/src/models/associations.ts

/**
 * associations.ts
 * -----------------
 * Defines all Sequelize model relationships for the application.
 *
 * Relationships included:
 *  - One-to-Many
 *  - One-to-One
 *  - Many-to-Many (through tables)
 *
 * Notes:
 *  - All aliases (`as`) are unique to avoid conflicts.
 *  - This file must be imported *after* all models are initialized.
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
 * Initializes all associations between models.
 */
export const applyAssociations = () => {
  
  Role.hasMany(Access, { foreignKey: "role_id", as: "roleAccesses" });
  Access.belongsTo(Role, { foreignKey: "role_id", as: "accessRole" });

  Access.hasOne(User, { foreignKey: "access_id", as: "accessUser" });
  User.belongsTo(Access, { foreignKey: "access_id", as: "userAccess" });

  Address.hasMany(Customer, { foreignKey: "address", as: "addressCustomers" });
  Customer.belongsTo(Address, { foreignKey: "address", as: "customerAddress" });

  Warehouse.hasMany(Order, { foreignKey: "warehouse_id", as: "warehouseOrders" });
  Order.belongsTo(Warehouse, { foreignKey: "warehouse_id", as: "orderWarehouse" });

  Customer.hasMany(Order, { foreignKey: "customer_id", as: "customerOrders" });
  Order.belongsTo(Customer, { foreignKey: "customer_id", as: "orderCustomer" });
  
  OrderStatus.hasMany(Order, { foreignKey: "status_id", as: "statusOrders" });
  Order.belongsTo(OrderStatus, { foreignKey: "status_id", as: "orderStatus" });
  
  // Order → OrderItem (1:N)
  Order.hasMany(OrderItem, { foreignKey: "order_id", as: "orderItems" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "itemOrder" });
  
  // Product → OrderItem (1:N)
  Product.hasMany(OrderItem, { foreignKey: "product_id", as: "productItems" });
  OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "itemProduct" });
  
  Warehouse.belongsToMany(Product, {through: WarehouseProduct,foreignKey: "warehouse_id",otherKey: "product_id",as: "warehouseProducts",});
  Product.belongsToMany(Warehouse, {through: WarehouseProduct,foreignKey: "product_id",otherKey: "warehouse_id",as: "productWarehouses",});
};


