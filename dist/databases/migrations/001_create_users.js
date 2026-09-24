"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable("users", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        admin_number: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    });
}
async function down(queryInterface) {
    await queryInterface.dropTable("users");
}
