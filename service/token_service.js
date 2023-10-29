const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token_models");
const { JWT_ACCES_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

class TokenService {
  // робимо функцію з генераціі двох токенів(acces та refresh)
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCES_SECRET_KEY, {
      expiresIn: "2m",
    });

    return accessToken;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCES_SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(accessToken) {
    const tokenData = await TokenModel.findOne({ accessToken });
    return tokenData;
  }

  //тут робимо функцію з перезаписом токену,якщо він існую,тобто юзер вже є,або зі збереженням нового токену якщо юзер зайшов вперше
  async saveToken(userId, accessToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.accessToken = accessToken;
      return tokenData.save();
    }
    return await TokenModel.create({ user: userId, accessToken });
  }

  async removeToken(accessToken) {
    const tokenData = await TokenModel.deleteOne({ accessToken });
    return tokenData;
  }
}

module.exports = new TokenService();
