const joi = require("joi");

class TodoSchemas {
  addSchema = joi.object({
    todo: joi.string().required().messages({ "any.required": "Missing required todo field" }),
  });
}

module.exports = new TodoSchemas();
