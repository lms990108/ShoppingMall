const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

userSchema.virtual("role").get(function () {
  switch (this.level) {
    case 0:
      return "customer";
    case 1:
      return "admin";
    default:
      return "unknown";
  }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
  return token;
};


// 이 부분은 의논 후 삭제
// userSchema.methods.toJSON = function() {
//     const obj = this._doc;
//     delete obj.password;
//     delete obj.__v; // 버전 정보도 빼준다
//     delete obj.updatedAt;
//     delete obj.createdAt;
//     return obj;
// };


const User = mongoose.model("User", userSchema);
module.exports = User;
