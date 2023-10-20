const CustomError = require("../helpers/customError");
const TokenService = require("../service/token_service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw CustomError(401, "User unauthorized");
      return next();
    }
    const accessToken = authHeader.split(" ")[1];
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(CustomError(401, "User unauthorized"));
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(CustomError(401, "User unauthorized"));
  }
};
