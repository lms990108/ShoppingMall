const User = require('../models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const joinService = require('../services/joinService');
// const responseModel = 이 부분 더 고려해서 작성 예정(넣을까 고려중)

// 회원가입 페이지 설정
joinService.createUser = async(req, res) => {
try {
    let { email, password, name, level } = req.body;
    const user = await User.findOne({ email });// 이미 회원 가입된 사람이 있을 때, 회원가입을 막는 부분
    if(user) {
        throw new Error("이미 존재하는 회원입니다");
    }; 
    const salt = await bcrypt.genSalt(saltRounds); // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, salt); // 해시를 만들어 준다 
    const newUser = new User({ email, password:hashedPassword, name, level:level?level: 'customer' }); // 새로운 유저 생성
    await newUser.save();
    // const responseModel = 
    return res.status(201).json({ status: '성공' });
    // redirect로 짜면?? - 고려 후, 수정 예정
} catch(error) {
    res.status(400).json({ status: '실패', error: error.message })
}};

// 로그인 - 이메일로 로그인 하는 패턴 설정
// 그냥 유저가 적은 비밀번호와 관리자가 가지고 있는 해시화된 비밀번호를 구별하는 방법으로 compareSync를 사용
// 유저가 쓴 비번과 관리자가 가지고 있는 비번이 맞으면 토큰 발행

joinService.loginAsEmail = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            throw new Error("가입되지 않은 회원입니다");
        }

            const isMatched = bcrypt.compareSync(password, user.password);
            if(isMatched){ 
                throw new Error("아이디 혹은 비밀번호가 일치하지 않습니다");
        }
                const token = await user.generateToken(); // 토큰만드는 부분 User.js 추가
                res.status(200).json({ status: '성공', user, token });                
            } catch(error) {
        res.status(400).json({ status: '실패', error });
    }
};

// 유저의 아이디를 이용하여 해당 이용자를 찾는 부분
joinService.getUser = async(req, res) => {
    try{
        const {userId} = req;
        const user = await User.findById(userId);

        if(!user) throw new Error('토큰값이 유효하지 않습니다');
        res.status(200).json({ status: '성공', user });
        } catch(error) {
        res.status(400).json({ status: "실패", error:error.message });
    }
};
module.exports = joinService;
   