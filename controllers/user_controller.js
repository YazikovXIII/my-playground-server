const UserService = require("../service/user_service");
const { CLIENT_URL } = process.env;

class UserController {
  async registration(req, res, next) {
    try {
      const { name, username, email, password } = req.body;
      const userData = await UserService.registration(name, username, email, password);
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
      return res.json(userData);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async logout(req, res, next) {
    try {
      const accessToken = req.headers.authorization;
      console.log("access", accessToken);
      await UserService.logout(accessToken);
      return res.status(200).json({ message: "Logged Out" });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async getCurrent(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const userData = await UserService.getCurrent(accessToken);
      return res.json(userData);
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
