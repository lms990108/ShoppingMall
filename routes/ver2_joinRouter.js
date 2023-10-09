const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const JoinService = require("../services/ver2_joinService");
const User = require("../models/userModel");

const joinService = new JoinService(User);
const router = Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, password, name, level = 0 } = req.body;

    // 사용자 객체 검증 로직.
    if (!email || !password || !name) {
      throw new Error("Invalid input data");
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
