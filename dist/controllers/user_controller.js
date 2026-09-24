"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user_service"));
class UserController {
    static async register(req, res) {
        try {
            const { name, email, username, password } = req.body;
            const user = await user_service_1.default.register(name, email, username, password);
            return res.status(201).json({
                message: "User registered successfully",
                user
            });
        }
        catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
}
exports.default = UserController;
