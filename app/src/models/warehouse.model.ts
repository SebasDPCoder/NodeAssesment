import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface WarehouseAttributes {
  id_warehouse: number;
  name: string;
  location: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

type WarehouseCreationAttributes = Optional<WarehouseAttributes, "id_warehouse">;

class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes {
  public id_warehouse!: number;
  public name!: string;
  public location!: string;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

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
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: "warehouses",
    modelName: "Warehouse",
    timestamps: false,
  }
);

export default Warehouse;
