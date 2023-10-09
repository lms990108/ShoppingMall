// joinService.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

class JoinService {
  async createUser(userData) {
    const { email, password, name, level } = userData;

    // 입력값 검증 로직 (예시)
    if (
      !this.validateEmail(email) ||
      !this.validatePassword(password) ||
      !name
    ) {
      throw new Error("Invalid input data");
    }

    // 이메일은 소문자로 처리
    const lowerCaseEmail = email.toLowerCase();

    // 이미 존재하는 경우 회원가입 불가
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      throw new Error("이미 존재하는 회원입니다");
    }

    // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 사용자 생성
    const user = await User.create({
      email: lowerCaseEmail,
      password: hashedPassword,
      name,
      level: level === 1 ? "admin" : "customer",
    });

    return user;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    // 예: 최소 8자, 하나 이상의 숫자 및 하나 이상의 대문자 포함
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  }
}

module.exports = JoinService;
