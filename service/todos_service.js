const CustomError = require("../helpers/customError");
const TodoModel = require("../models/todos_model");
const TokenService = require("./token_service");

class TodoService {
  async addTodo(token, todo) {
    const accessToken = token.split(" ")[1];
    const tokenData = await TokenService.findToken(accessToken);
    const todoData = await TodoModel.create({
      todo,
      user: tokenData.user,
    });
    return todoData;
  }

  async deleteTodo(id) {
    const todoData = await TodoModel.findByIdAndDelete(id);
    return todoData;
  }

  async getTodos(token) {
    const accessToken = token.split(" ")[1];
    const tokenData = await TokenService.findToken(accessToken);
    const user = tokenData.user;

    const todosData = await TodoModel.find({ user });
    return todosData;
  }

  async todoIsComplete(id) {
    const toggledTodo = await TodoModel.findById(id);
    const todoData = await TodoModel.findByIdAndUpdate(id, { isComplete: !toggledTodo.isComplete });
    return todoData;
  }
}

module.exports = new TodoService();
