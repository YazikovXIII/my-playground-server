const CustomError = require("../helpers/customError");
const PostModel = require("../models/post_model");
const TokenService = require("./token_service");

class PostService {
  async addPost(token, imgURL, header, text) {
    const accessToken = token.split(" ")[1];
    const tokenData = await TokenService.findToken(accessToken);
    const user = tokenData.user;
    const postData = await PostModel.create({ user, imgURL, header, text });
    return postData;
  }

  async getAll() {
    const postData = await PostModel.find();
    return postData;
  }
}

module.exports = new PostService();
