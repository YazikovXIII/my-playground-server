const joi = require("joi");

class UserSchemas {
  regSchema = joi.object({
    email: joi.string().email().required().messages({
      "any.required": "Missing required email field",
    }),
    name: joi.string().messages({
      "any.required": "Missing required name field",
    }),
    username: joi.string().messages({
      "any.required": "Missing required username field",
    }),
    password: joi.string().min(4).max(20).required().messages({
      "string.min": "Password should be at least 4 characters long",
      "string.max": "Password should be no more than 20 characters long",
      "any.required": "Missing required password field",
    }),
  });

  loginSchema = joi.object({
    email: joi.string().email().required().messages({
      "any.required": "Missing required email field",
    }),
    password: joi.string().min(4).max(20).required().messages({
      "string.min": "Password should be at least 4 characters long",
      "string.max": "Password should be no more than 20 characters long",
      "any.required": "Missing required password field",
    }),
  });
}

module.exports = new UserSchemas();
