import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Warehouse from "./warehouse.model";
import Product from "./product.model";

export interface WarehouseProductAttributes {
  warehouse_id: number;
  product_id: number;
  stock_quantity: number;

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
