const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) throw new Error("토큰을 찾을 수가 없습니다");

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("유효하지 않은 토큰입니다");
      }
      req.userId = payload._id;
      next();
    });
  } catch (error) {
    res.status(401).json({ status: "실패", error: error.message });
  }
};

module.exports = {
  authenticate,
};
