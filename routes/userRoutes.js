const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const userRouter = express.Router();
//routes
userRouter
    .route("/")
    .all(authController.protect)
    .get(userController.getAllUsers)
    .post(userController.addUser);
userRouter.route("/:id").all(authController.protect).get(userController.getUserById);
userRouter.route("/:id").all(authController.protect).put(userController.updateUser);
userRouter.route("/:id").all(authController.protect).delete(userController.deleteUser);

module.exports = userRouter;