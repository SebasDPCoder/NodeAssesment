/**
 * WarehouseProduct Model
 * -----------------------
 * This file defines the Sequelize `WarehouseProduct` model, representing
 * the relationship between warehouses and products.
 *
 * Contains:
 *  - Model attributes (`WarehouseProductAttributes`).
 *  - Required attributes for creation (`WarehouseProductCreationAttributes`).
 *  - Sequelize model definition with its columns, constraints, and relationships.
 *
 * Used to track product stock in each warehouse.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Main attributes of the `warehouse_products` entity.
 * Each record links a product to a warehouse and tracks its stock quantity.
 */
export interface WarehouseProductAttributes {
  id_warehouse_product: number;
  warehouse_id: number;
  product_id: number;
  stock_quantity: number;
  is_active: boolean;
}

/**
 * Attributes used for creating a new WarehouseProduct.
 * The `id_warehouse_product` is optional because it is auto-generated.
 */
type WarehouseProductCreationAttributes = Optional<WarehouseProductAttributes, "id_warehouse_product">;

/**
 * Class that represents the `WarehouseProduct` model in Sequelize.
 * This class maps to the `warehouse_products` table in the database.
 */
class WarehouseProduct
  extends Model<WarehouseProductAttributes, WarehouseProductCreationAttributes>
  implements WarehouseProductAttributes {
  public id_warehouse_product!: number;
  public warehouse_id!: number;
  public product_id!: number;
  public stock_quantity!: number;
  public is_active!: boolean;
}

/**
 * Sequelize model initialization.
 * Defines table columns, constraints, and metadata.
 */
WarehouseProduct.init(
  {
    id_warehouse_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "warehouses",
        key: "id_warehouse",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id_product", 
      },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "warehouse_products",
    modelName: "WarehouseProduct",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "update_at",
  }
);

export default WarehouseProduct;


