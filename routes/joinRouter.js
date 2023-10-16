const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const JoinService = require("../services/joinService");
const User = require("../models/userModel");

const joinService = new JoinService(User);
const router = Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, password, name, level = 0 } = req.body;


    if (!email || !password || !name) {
      throw new Error("이메일과 이름을 양식에 맞게 작성해주세요.");
    }

    const user = await joinService.createUser({ email, password, name, level });
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        level: user.level === 1 ? "admin" : "customer",
      },
    });
  }),
);

module.exports = router;
