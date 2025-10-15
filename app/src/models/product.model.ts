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
  price: number;
  is_active: boolean;
}

/**
 * Attributes used for creating a new Product.
 * The `id_product` is optional because it is auto-generated.
 */
export type ProductCreationAttributes = Optional<ProductAttributes, "id_product">;

/**
 * Class that represents the `Product` model in Sequelize.
 */
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id_product!: number;
  public code!: string;
  public name!: string;
  public price!: number;
  public is_active!: boolean;
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
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "update_at", 
});

export default Product;
