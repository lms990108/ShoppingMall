//User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// const generateToken을 정의해 줄 것 (해결)
// level은 어드민과 일반 유저를 가르는 항목
// 기본 유저 세팅은 디폴트로 해서, 기본 유저가 모두 customer이라고 가정함
// customer와 admin의 타입으로 나눠서 level을 설정하려고 함(예정)
// 유저 스키마에 날짜 등을 기입할 수 있게? (수정 예정)

const userSchema = Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: String, default: "customer" } // 숫자 지정 고려
}, { timestamps: true } 
);

// user 정보 한 번에 볼 수 있게 여기서 토큰 작성함
userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {expiresIn: "1d"});
    return token;
};

// 보여질 정보들 중에서 제외되어야 할 것에 대한 처리
// userSchema.methods.toJSON = function() {
//     const obj = this._doc;
//     delete obj.password;
//     delete obj.__v; // 버전 정보도 빼준다
//     delete obj.updatedAt;
//     delete obj.createdAt;
//     return obj;
// };

const User = mongoose.model('User', userSchema);
module.exports = User;