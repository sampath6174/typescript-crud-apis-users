"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user_model"));
class UsersService {
    static async register(name, email, username, password) {
        const existingEmail = await user_model_1.default.findOne({
            where: { email }
        });
        if (existingEmail) {
            throw new Error("Email already exists");
        }
        const existingUsername = await user_model_1.default.findOne({
            where: { username }
        });
        if (existingUsername) {
            throw new Error("Username already exists");
        }
        let adminNumber;
        let existingAdminNumber;
        do {
            adminNumber = Math.floor(100000 + Math.random() * 900000);
            existingAdminNumber = await user_model_1.default.findOne({
                where: { admin_number: adminNumber }
            });
        } while (existingAdminNumber);
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await user_model_1.default.create({
            name,
            email,
            username,
            password: hashedPassword,
            admin_number: adminNumber
        });
        return user;
    }
}
exports.default = UsersService;
