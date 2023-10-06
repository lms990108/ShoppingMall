const jwt = require("jsonwebtoken");
const User = require('./models/userModel');
const bcrypt = require("bcryptjs");
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authService = {};

// 사용자 로그인 - 이메일과 패스워드 검증 후에 맞는 경우 토큰 발행
authService.loginAsEmail = async(req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});

        if (user) {
            const isMatched = await bcrypt.compare(password, user.password);
            if (isMatched) {
                const token = await user.generateToken(); // 토큰 만들기
                res.status(200).json({status: "성공", user, token});
                return; 
            } else {
                throw new Error("이메일과 패스워드 중 하나가 틀립니다");
            }
        } else {
            throw new Error("해당 이메일로 가입된 사용자가 없습니다.");
        }

    } catch(error) {
        res.status(400).json({ status: "실패", error: error.message });
    }
};

// 가입을 할 때, 유저를 인증하고 넘어가는 미들웨어를 위해? 
// authService.verifyUser = async (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
//     if (!token) {
//         return res.status(403).json({message: "접근이 거부되었습니다."});
//     }
// // 토큰 검증
//     jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({message: "유효하지 않은 토큰입니다."});
//         }
//         req.userId = decoded._id;
//         next();
//     });
// }; 

// 토큰값으로 유저 아이디를 찾아내는 부분
// authService.authenticate - 토큰을 검증하는 미들웨어
authService.authenticate = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) throw new Error("토큰을 찾을 수가 없습니다");
        
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) throw new Error('유효하지 않은 토큰입니다');
            req.userId = payload._id;
            next();
        });
        
    } catch (error) {
        res.status(401).json({status: "실패", error:error.message});
    }
};

// 어드민인증된 사람을 체크하는 과정
authService.checkAdminPerson = async(req, res, next) => {
    try{
        const {userId} =req.body;
        const user = await User.findById(userId);
        if(user.level !== 'admin') throw new Error('권한이 없습니다');
        next();
    } catch(error) {
        res.status(400).json({ status: '실패', error: error.message });
    }
}; 

module.exports = authService;