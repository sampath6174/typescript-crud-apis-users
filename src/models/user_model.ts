import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  admin_number: number;
  name: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    admin_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default User;