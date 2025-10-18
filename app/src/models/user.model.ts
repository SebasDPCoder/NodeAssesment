import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface UserAttributes {
    id_user: number;
    document: string;
    full_name: string;
    email: string;
    is_active: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, "id_user">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    id_user!: number;
    document!: string;
    full_name!: string;
    email!: string;
    is_active!: boolean;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
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
    tableName: "users",
    modelName: "User",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "update_at", 
  }
);

export default User;