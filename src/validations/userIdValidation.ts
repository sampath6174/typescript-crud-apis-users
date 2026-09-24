import { checkSchema } from "express-validator";

export const userIdValidation = checkSchema({
  id: {
    notEmpty: {
      errorMessage: "User ID is required"
    },
    isInt: {
      errorMessage: "User ID must be a valid integer"
    }
  }
});