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

      return res.json(postData);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
  async getUsersPosts(req, res) {
    try {
      const token = req.headers.authorization;
      const postData = await PostService.getUsersPosts(token);
      const reversed = postData.reverse();
      return res.json(reversed);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
  async deleteUsersPost(req, res) {
    try {
      const { id } = req.params;
      const postData = await PostService.deleteUsersPost(id);
      return res.json(postData);
    } catch (error) {
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
        message: error.message || "Внутрішня помилка сервера",
      });
    }
  }

  async editPost(req, res, next) {
    console.log("edit");

    try {
      const { id } = req.params;
      console.log("id", id);
      console.log("req.body", req.body);

      const { header, text } = req.body;
      console.log("header", header);
      const imgURL = req.file.path;

      console.log("url", imgURL);

      const postData = await PostService.editPost(id, header, text, imgURL);
      return res.json(postData);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
}

module.exports = new PostController();
