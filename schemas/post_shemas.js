const joi = require("joi");

class PostSchemas {
  addSchema = joi.object({
    header: joi.string().required().messages({ "any.required": "Missing required (Post Header) field" }),
    text: joi.string().required().messages({ "any.required": "Missing required (Post Text) field" }),
  });
}

module.exports = new PostSchemas();
