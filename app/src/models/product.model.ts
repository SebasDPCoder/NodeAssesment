/**
 * Product Model
 * -------------
 * This file defines the Sequelize `Product` model, representing the `products` table.
 *
 * Contains:
 *  - Model attributes (`ProductAttributes`).
 *  - Required attributes for creation (`ProductCreationAttributes`).
 *  - Sequelize model definition with its columns and constraints.
 *
 * Used by services and controllers for CRUD operations.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Main attributes of the `products` entity.
 */
export interface ProductAttributes {
  id_product: number;
  code: string;
  name: string;
  description: string;
  price: number;
  is_deleted: boolean;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Attributes used for creating a new Product.
 * The `id_product` is optional because it is auto-generated.
 */
export type ProductCreationAttributes = Optional<ProductAttributes, "id_product" | "is_deleted" | "created_at" | "updated_at">;

/**
 * Class that represents the `Product` model in Sequelize.
 */
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id_product!: number;
  public code!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public is_deleted!: boolean;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

/**
 * Sequelize model initialization.
 */
Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false, // ya manejamos manualmente created_at y updated_at
  }
);

export default Product;
