import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Warehouse from "./warehouse.model";
import Product from "./product.model";

export interface WarehouseProductAttributes {
  warehouse_id: number;
  product_id: number;
  stock_quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

type WarehouseProductCreationAttributes = Optional<
  WarehouseProductAttributes,
  never
>;

class WarehouseProduct
  extends Model<WarehouseProductAttributes, WarehouseProductCreationAttributes>
  implements WarehouseProductAttributes {
  public warehouse_id!: number;
  public product_id!: number;
  public stock_quantity!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

WarehouseProduct.init(
  {
    warehouse_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "warehouses",
        key: "id_warehouse",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    tableName: "warehouse_products",
    modelName: "WarehouseProduct",
    timestamps: false,
  }
);

// Relaciones


export default WarehouseProduct;
