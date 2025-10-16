import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Warehouse from "./warehouse.model";
import Product from "./product.model";

export interface WarehouseProductAttributes {
  id_warehouse_product: number;
  warehouse_id: number;
  product_id: number;
  stock_quantity: number;
  is_active: boolean;
}

type WarehouseProductCreationAttributes = Optional<WarehouseProductAttributes,"id_warehouse_product">;

class WarehouseProduct
  extends Model<WarehouseProductAttributes, WarehouseProductCreationAttributes>
  implements WarehouseProductAttributes {
  public id_warehouse_product!: number;
  public warehouse_id!: number;
  public product_id!: number;
  public stock_quantity!: number;
  public is_active!: boolean;

}

WarehouseProduct.init(
  {
    id_warehouse_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "warehouse",
        key: "warehouse_id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "product",
        key: "product_id",
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
    }
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
