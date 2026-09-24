import { checkSchema } from "express-validator";

export const updateUserValidation = checkSchema({
  name: {
    optional: true,
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage: "Name must be between 2 and 100 characters"
    }
  },

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
    optional: true,
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