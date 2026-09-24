"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const user_validation_1 = require("../validations/user_validation");
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
router.post("/register", user_validation_1.registerValidation, validate_1.validate, user_controller_1.default.register);
exports.default = router;
