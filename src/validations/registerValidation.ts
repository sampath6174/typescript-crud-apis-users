import { checkSchema } from "express-validator";

export const registerValidation = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Name is required"
    },
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage: "Name must be between 2 and 100 characters"
    }
  },

  email: {
    notEmpty: {
      errorMessage: "Email is required"
    },
    isEmail: {
      errorMessage: "Please provide a valid email"
    }
  },

  username: {
    notEmpty: {
      errorMessage: "Username is required"
    },
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: "Username must be between 3 and 100 characters"
    }
  },

  password: {
    notEmpty: {
      errorMessage: "Password is required"
    },
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: "Password must be between 8 and 20 characters"
    },
    matches: {
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      errorMessage:
        "Password must contain uppercase, lowercase, number and special character"
    }
  }
});