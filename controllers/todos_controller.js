const TodoService = require("../service/todos_service");

class TodosController {
  async addTodo(req, res, next) {
    try {
      const { todo } = req.body;
      const accessToken = req.headers.authorization;
      const todoData = await TodoService.addTodo(accessToken, todo);
      return res.json(todoData);
    } catch (error) {
      console.log("MY add ERROR", error);

      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      const todoData = await TodoService.deleteTodo(id);
      return res.json(todoData);
    } catch (error) {
      console.log("MY del ERROR", error);

      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async getTodos(req, res, next) {
    try {
      const accessToken = req.headers.authorization;
      const todoData = await TodoService.getTodos(accessToken);
      return res.json(todoData);
    } catch (error) {
      console.log("MY get ERROR", error);

      return res.status(error.status).json({
        message: error.message,
      });
    }
  }

  async todoIsComplete(req, res, next) {
    try {
      const { id } = req.params;
      const todoData = await TodoService.todoIsComplete(id);
      return res.json(todoData);
    } catch (error) {
      console.log("MY toggleComplete ERROR", error);

      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
}

module.exports = new TodosController();
