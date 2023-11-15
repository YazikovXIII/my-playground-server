const express = require("express");
const router = express.Router();
const bodyValidation = require("../middleware/bodyValidation");
const PostSchema = require("../schemas/post_shemas");
const authMiddleware = require("../middleware/auth_middleware");
const upload = require("../middleware/upload");
const PostController = require("../controllers/post_controller");

// bodyValidation(PostSchema),
router.post("/add", authMiddleware, upload.single("postThumb"), PostController.addpost);
router.get("/getAll", authMiddleware, PostController.getAll);
router.get("/getUsersPosts", authMiddleware, PostController.getUsersPosts);
router.delete("/deleteUsersPost/:id", authMiddleware, PostController.deleteUsersPost);
router.put("/editPost/:id", authMiddleware, upload.single("postThumb"), PostController.editPost);

module.exports = router;
