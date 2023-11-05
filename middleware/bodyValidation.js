const CustomError = require("../helpers/customError");

const bodyValidation = (schema) => {
  return (req, res, next) => {
    console.log("body", req.body);
    console.log("fields", req.fields);
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw CustomError(400, "Missing fields");
      }
      const { error } = schema.validate(req.body);
      if (error) {
        throw CustomError(400, error.message);
      }
      next();
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
  };
};

module.exports = bodyValidation;
