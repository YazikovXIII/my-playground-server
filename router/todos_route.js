const express = require("express");
const router = express.Router();
const bodyValidation = require("../middleware/bodyValidation");
const authMiddleware = require("../middleware/auth_middleware");
const TodosController = require("../controllers/todos_controller");
const TodoSchema = require("../schemas/todo_shemas");

router.post("/add", authMiddleware, bodyValidation(TodoSchema.addSchema), TodosController.addTodo);
// router.patch("/complete", authMiddleware);
router.delete("/delete/:id", authMiddleware, TodosController.deleteTodo);
router.get("/getTodos", authMiddleware, TodosController.getTodos);

module.exports = router;
