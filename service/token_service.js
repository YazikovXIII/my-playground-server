const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token_models");
const { JWT_ACCES_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

class TokenService {
  // робимо функцію з генераціі двох токенів(acces та refresh)
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCES_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCES_SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_SECRET_KEY);
      return userData;
    } catch (error) {}
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }

  //тут робимо функцію з перезаписом токену,якщо він існую,тобто юзер вже є,або зі збереженням нового токену якщо юзер зайшов вперше
  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await TokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
