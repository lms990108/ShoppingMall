// 권한 확인 미들웨어
const User = require("../models/userModel");

const checkUserOrAdmin = async (req, res, next) => {
  try {
    // 요청으로부터 userId를 얻는 방법은 요청의 형태에 따라 다를 수 있습니다.
    // 예를 들어, /users/:userId 형태의 경로에서는 req.params.userId로 얻을 수 있습니다.
    const requestedUserId = req.params.userId || req.body.userId || req.userId;

    // authenticate 미들웨어에서 설정된 userId
    const { userId } = req;
    const user = await User.findById(userId);
    req.user = user;

    // 요청된 userId와 토큰의 userId가 동일한 경우 통과
    if (requestedUserId === userId) {
      return next();
    }

    // 아니면, 사용자를 찾아 관리자인지 확인
    if (user && user.level === 1) {
      return next();
    }

    // 그 외의 경우, 권한이 없다는 메시지 반환
    throw new Error("권한이 없습니다");
  } catch (error) {
    res.status(400).json({ status: "실패", error: error.message });
  }
};

module.exports = {
  checkUserOrAdmin,
};
