const PostService = require("../service/post_service");

class PostController {
  async addpost(req, res, next) {
    try {
      const token = req.headers.authorization;
      const { header, text } = req.body;
      const imgURL = req.file.path;
      const postData = await PostService.addPost(token, imgURL, header, text);
      return res.json(postData);
    } catch (error) {
      return res.status((error.status = 500)).json({
        message: error.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      const postData = await PostService.getAll();
      const reversedPostData = postData.reverse();
      return res.json(reversedPostData);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
}

module.exports = new PostController();
