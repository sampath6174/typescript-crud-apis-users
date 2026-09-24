import { Router } from "express";

import UserController from "../controllers/userController";
import { registerValidation } from "../validations/registerValidation";
import { loginValidation } from "../validations/loginValidation";
import { updateUserValidation } from "../validations/updateUserValidation";
import { userIdValidation } from "../validations/userIdValidation";

import { validate } from "../middlewares/validate";

import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validate,
  UserController.register
);

router.post(
  "/login",
  loginValidation,
  validate,
  UserController.login
);

router.get(
  "/",
  authMiddleware,
  UserController.getAllUsers
);

router.get(
  "/:id",
  authMiddleware,
  userIdValidation,
  validate,
  UserController.getUserById
);

router.put(
  "/:id",
  authMiddleware,
  userIdValidation,
  updateUserValidation,
  validate,
  UserController.updateUser
);

router.delete(
  "/:id",
  authMiddleware,
  userIdValidation,
  validate,
  UserController.deleteUser
);

router.post(
  "/refresh",
  UserController.refreshToken
);

export default router;