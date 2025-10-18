/**
 * Warehouse Model
 * -----------------
 * This file defines the Sequelize `Warehouse` model, representing
 * the `warehouses` table in the database.
 *
 * Contains:
 *  - Model attributes (`WarehouseAttributes`).
 *  - Required attributes for creation (`WarehouseCreationAttributes`).
 *  - Sequelize model definition with its columns and constraints.
 *
 * Used to manage warehouse data, including name, location, and status.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Main attributes of the `warehouses` entity.
 * Each record represents a physical or logical warehouse.
 */
export interface WarehouseAttributes {
  id_warehouse: number;
  name: string;
  location: string;
  is_active: boolean;
}

/**
 * Attributes used for creating a new Warehouse.
 * The `id_warehouse` is optional because it is auto-generated.
 */
type WarehouseCreationAttributes = Optional<WarehouseAttributes, "id_warehouse">;

/**
 * Class that represents the `Warehouse` model in Sequelize.
 * Provides the model structure and typing for TypeScript.
 */
class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes {
  public id_warehouse!: number;
  public name!: string;
  public location!: string;
  public is_active!: boolean;
}

/**
 * Sequelize model initialization.
 * Defines table columns, data types, constraints, and metadata.
 */
Warehouse.init(
  {
    id_warehouse: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Warehouse name or identifier",
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Physical address or location description of the warehouse",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indicates whether the warehouse is active",
    },
  },
  {
    sequelize,
    tableName: "warehouses",
    modelName: "Warehouse",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "update_at",
  }
);

export default Warehouse;
