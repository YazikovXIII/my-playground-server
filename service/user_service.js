const CustomError = require("../helpers/customError");
const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mail_service");
const TokenService = require("../service/token_service");
const UserDto = require("../dtos/user_dto");
const { API_URL } = process.env;

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw CustomError(409, `This email (${email}) is already in use`);
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      activationLink,
    });
    await MailService.sendActivationMail(email, `${API_URL}/user/activation/${activationLink}`);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activation(activationLink) {
    const isUser = await UserModel.findOne({ activationLink });
    if (!isUser) {
      throw CustomError(404, "User not found");
    }
    if (isUser.isActivated) {
      throw CustomError(500, "Email is already verified");
    }
    isUser.isActivated = true;
    isUser.activationLink = "";
    await isUser.save();
  }

  async login(email, password) {
    const isUser = await UserModel.findOne({ email });

    if (!isUser) {
      throw CustomError(401, "email or password is wrong");
    }
    if (!isUser.isActivated) {
      throw CustomError(401, "email is not verified");
    }

    const passwordMatch = await bcrypt.compare(password, isUser.password);

    if (!passwordMatch) {
      throw CustomError(401, "email or password is wrong");
    }

    const userDto = new UserDto(isUser);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw CustomError(401, "user unauthorized");
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const isTokenInDb = TokenService.findToken(refreshToken);
    if (!userData || !isTokenInDb) {
      throw CustomError(401, "user unauthorized");
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUsers() {
    const userData = await UserModel.find();
    const usersDto = userData.map((user) => new UserDto(user));
    return usersDto;
  }
}

module.exports = new UserService();
