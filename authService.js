const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JsonWebTokenError = require("jsonwebtoken");


const authService = {};
authService.loginAsEmail = async(req, res) => {
try {
        const { email, password } = req.body;s
        let user = await User.findOne({email});
        if(user) {
            const isMatched = await bcrypt.compare(password, user.password);
            if(isMatched) {
                const token = await user.generateToken(); // 토큰 만들기
                return res.status(200).json({status: "성공", user, token});
            }
        }
        throw new Error("이메일과 패스워드 중 하나가 틀립니다");
} catch(error) {
        res.status(400).json({ status: "실패", error: error.message });
}
};

// 토큰값으로 유저 아이디를 찾아내는 부분
// Bearer는 authorization 헤더에 포함돼 api 인증정보로 이용한다 (삭제)
authService.authenticate = async(req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if(!tokenString) throw new Error("토큰을 찾을 수가 없습니다");
        
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) throw new Error('유효하지 않은 토큰입니다');
            req.userId = payload._id;
        });
        next();
    } catch (error) {
        res.status(400).json({status: "실패", error:error.message});
    }
};

// 어드민인증된 사람을 체크하는 과정
authService.checkAdminPerson = async(req, res, next) => {
    try{
        const { userId } =req;
        const user = await User.findById(userId);
        if(user.level !== 'admin') throw new Error('권한이 없습니다');
        next();
    } catch(error) {
        res.status(400).json({ status: '실패', error: error.message });
    }
}; 

module.exports = authService;