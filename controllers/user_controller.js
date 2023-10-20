const user_service = require("../service/user_service");
const UserService = require("../service/user_service");
const { CLIENT_URL } = process.env;

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async activation(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activation(activationLink);
      return res.redirect(CLIENT_URL);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async getCurrent(req, res, next) {
    try {
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async getUsers(req, res, next) {
    try {
      const userData = await UserService.getUsers();
      return res.json(userData);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
