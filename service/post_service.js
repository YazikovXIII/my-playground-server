const CustomError = require("../helpers/customError");
const PostModel = require("../models/post_model");
const TokenService = require("./token_service");
const UserModel = require("../models/user_model");

class PostService {
  async addPost(token, imgURL, header, text) {
    const accessToken = token.split(" ")[1];
    const tokenData = await TokenService.findToken(accessToken);
    const user = await UserModel.findById(tokenData.user);
    const postData = await PostModel.create({ user: user._id, owner: user.username, imgURL, header, text });
    return postData;
  }

  async getAll() {
    const postData = await PostModel.find();
    return postData;
  }

  async getUsersPosts(token) {
    const accessToken = token.split(" ")[1];
    const tokenData = await TokenService.findToken(accessToken);
    const userID = tokenData.user._id;
    const postData = await PostModel.find({ user: userID });
    return postData;
  }

  async deleteUsersPost(id) {
    const postData = await PostModel.findByIdAndDelete(id);
    return postData;
  }

  async editPost(id, header, text, imgURL) {
    const update = { header, text, imgURL };
    const options = { new: true };
    const updatedPost = await PostModel.findOneAndUpdate({ _id: id }, update, options);
    return updatedPost;
  }
}

module.exports = new PostService();
