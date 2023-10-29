const CustomError = require("../helpers/customError");
const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mail_service");
const TokenService = require("../service/token_service");
const UserDto = require("../dtos/user_dto");
const { API_URL } = process.env;

class UserService {
  async registration(name, username, email, password) {
    const candidate = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (candidate) {
      if (candidate.email === email) {
        throw CustomError(409, `This email (${email}) is already in use`);
      }
      if (candidate.username === username) {
        throw CustomError(409, `This username (${username}) is already in use`);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      name,
      username,
      password: hashedPassword,
      activationLink,
    });
    await MailService.sendActivationMail(email, `${API_URL}/user/activation/${activationLink}`);
    const userDto = new UserDto(user);
    const token = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, token);

    return {
      accesstoken: token,
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
    const token = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, token);

    return {
      accesstoken: token,
      user: userDto,
    };
  }

  async logout(accessToken) {
    const data = await TokenService.removeToken(accessToken);
    return data;
  }

  async getUsers() {
    const userData = await UserModel.find();
    const usersDto = userData.map((user) => new UserDto(user));
    return usersDto;
  }

  async getCurrent(accessToken) {
    const tokenData = await TokenService.findToken(accessToken);
    const userData = await UserModel.findById(tokenData.user);
    const userDto = new UserDto(userData);
    return userDto;
  }
}

module.exports = new UserService();
