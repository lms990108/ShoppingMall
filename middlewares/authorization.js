const User = require("../models/userModel");

const checkUserOrAdmin = async (req, res, next) => {
  try {
   
    const requestedUserId = req.params.userId || req.body.userId || req.userId;

    const { userId } = req;
    const user = await User.findById(userId);
    req.user = user;

    if (requestedUserId === userId) {
      return next();
    }

    if (user && user.level === 1) {
      return next();
    }

    throw new Error("권한이 없습니다");
  } catch (error) {
    res.status(400).json({ status: "실패", error: error.message });
  }
};

module.exports = {
  checkUserOrAdmin,
};
