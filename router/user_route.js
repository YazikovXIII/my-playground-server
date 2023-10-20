const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const bodyValidation = require("../middleware/bodyValidation");
const UserSchema = require("../schemas/user_schemas");
const authMiddleware = require("../middleware/auth_middleware");

router.post("/registration", bodyValidation(UserSchema.regSchema), userController.registration);

router.get("/activation/:link", userController.activation);

router.post("/login", bodyValidation(UserSchema.loginSchema), userController.login);

router.post("/logout", userController.logout);

router.get("/refresh", userController.refresh);

router.get("/users", authMiddleware, userController.getUsers);

router.get("/current", userController.getCurrent);

module.exports = router;
