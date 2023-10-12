const express = require("express");
const UserService = require("../services/userService");
const userModel = require("../models/userModel");

const { authenticate } = require("../middlewares/authentication");
const { checkUserOrAdmin } = require("../middlewares/authorization");
const asyncHandler = require("../utils/async-handler");

const userRouter = express.Router();
const userServiceInstance = new UserService(userModel);


userRouter.get(
  "/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const user = await userServiceInstance.getUserById(req.userId);
    res.status(200).json(user);
  }),
);


userRouter.put(
  "/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const user = await userServiceInstance.updateUser(
      req.userId,
      req.body,
    );
    res.status(200).json(user);
  }),
);


userRouter.delete(
  "/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const deletedUser = await userServiceInstance.deleteUser(req.userId);

    if(!deletedUser){
      const error  = new Error("사용자를 찾을 수 없습니다.");
      error.statusCode = 404
      throw error
    }
    res.status(200).json({message: "사용자가 성공적으로 삭제되었습니다.", user: deletedUser});
  }),
);

userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await userServiceInstance.loginUser(
      email,
      password,
    );
    res.status(200).json({ user, token });
  }),
);

module.exports = userRouter;
