const express = require("express");
const UserService = require("../services/userService");
const userModel = require("../models/userModel");

const { authenticate } = require("../middlewares/authentication");
const { checkUserOrAdmin } = require("../middlewares/authorization");
const asyncHandler = require("../utils/async-handler");

const userRouter = express.Router();
const userServiceInstance = new UserService(userModel);

// 조회
userRouter.get(
  "/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const user = await userServiceInstance.getUserById(req.userId);
    res.status(200).json(user);
  }),
);

/*
// 수정
userRouter.put(
  "/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const user = await userServiceInstance.updateUser(
      req.params.userId,
      req.body,
    );
    res.status(200).json(user);
  }),
);

// 삭제
userRouter.delete(
  "/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const user = await userServiceInstance.deleteUser(req.params.userId);
    res.status(200).json(user);
  }),
);

전체 조회
userRouter.get(
  "/list",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const users = await userServiceInstance.getUsersWithPaging(
      {},
      parseInt(page),
      parseInt(limit),
    );
    res.status(200).json(users);
  }),
);
*/

// 로그인
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
