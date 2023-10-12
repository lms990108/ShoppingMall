const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");


dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const SALT_ROUNDS = 10;

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async loginUser(email, password) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error("가입되지 않은 사용자입니다.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("잘못된 아이디 혹은 패스워드입니다.");
    }

    const token = user.generateToken();

    return { user, token };
  }

  async getUserById(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getUsersWithPaging(filter = {}, page = 1, limit = 10) {
    const users = await this.userModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return users;
  }

  async updateUser(userId, updates) {

    if (updates.password) {

      const saltRounds = 10;
      updates.password = await bcrypt.hash(updates.password, saltRounds);
    }

    const user = await this.userModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async deleteUser(userId) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

module.exports = UserService;