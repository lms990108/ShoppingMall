//User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 기본 유저 세팅은 디폴트로 해서, 기본 유저가 모두 customer이라고 가정함
// customer와 admin의 타입으로 나눠서 level을 설정하려고 함(예정)
// 유저 스키마에 날짜 등을 기입할 수 있게? (수정 예정)

/* - 원래 코드 (유저 스키마 level type을 number로 관리할 수 있도록 수정함)
const userSchema = Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: String, default: "customer" } // 유저 권한 관리 부분
}, { timestamps: true } 
);
*/

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    name: { 
        type: String, 
        required: true },
    level: { 
        type: Number, 
        default: 0 } // 0: customer, 1: admin
}, { timestamps: true }); // 데이터 언제 만들었는지 작성

// 'role' - level의 상태 customer과 admin
userSchema.virtual('role').get(function() {
    switch (this.level) {
        case 0: return 'customer';
        case 1: return 'admin';
        default: return 'unknown';
    }
});

// user 정보 한 번에 볼 수 있게 여기서 토큰 작성함
userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {expiresIn: "1d"});
    return token;
};

// 보여질 정보들 중에서 제외되어야 할 것에 대한 처리 (사용자가 보기에 불편한 정보 삭제)
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