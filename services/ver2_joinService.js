const bcrypt = require("bcryptjs");
const saltRounds = 10;

class JoinService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(userData) {
    const { email, password, name, level } = userData;

    // validateEmail과 validatePassword 메서드를 사용하여 입력값이 유효한지 확인
    if (
      !this.validateEmail(email) ||
      !this.validatePassword(password) ||
      !name
    ) {
      throw new Error("Invalid input data");
    }

    // 이미 존재하는 사용자인지 체크하기 위해, 데이터베이스에서 동일한 이메일을 가진 사용자를 조회합니다.
    // 만약 이미 존재하는 사용자라면, 에러.
    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new Error("이미 존재하는 회원입니다");
    }

    // 비밀번호를 해시
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // userModel을 사용하여, 데이터베이스에 새로운 사용자를 생성.
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
      level,
    });

    return user;
  }

  // 이메일 형식
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 비밀번호 형식 검증 (8자리 이상)
  validatePassword(password) {
    const passwordRegex = /^(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  }
}

module.exports = JoinService;
