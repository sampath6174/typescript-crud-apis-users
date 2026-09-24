import { checkSchema } from "express-validator";

export const loginValidation = checkSchema({
  email: {
    optional: true,
    isEmail: {
      errorMessage: "Please provide a valid email"
    }
  },

  username: {
    optional: true,
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: "Username must be between 3 and 100 characters"
    }
  },

  password: {
    notEmpty: {
      errorMessage: "Password is required"
    }
  }
});