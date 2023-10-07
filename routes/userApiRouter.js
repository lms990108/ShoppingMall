// user.api.js

const express = require('express');
const router = express.Router();
const joinService = require('../services/joinService');
const authService = require('../services/authService'); // authService를 임포트

// 1. 회원가입 설정
// 여기서 토큰값을 보내는 것에 get 설정함
// 토큰값은 헤더에 넣어서 보내주기 때문에. 헤더에 넣어서 보내주면 바디가 필요없어서 post말고, get을 쓴다.
// get사용 - 유저 정보 돌려주기 위해?
// 토큰이 가능한 토큰인지 알아보고, 이 토큰을 가지고 유저 찾아서 리턴한다. 
// 유저값 리턴하는 과정은 미들웨어 처리?
// authenticate는 다른 라우터에서도 필요한 작업이라 독립적으로 코드 구성
// 회원가입 서비스에서 돌아오는 과정에서 회원을 확인하는 미들웨어 적용 (고려중)

// joinService.loginAsEmail: 사용자를 이메일로 로그인
// authService.authenticate: 제공된 토큰을 검증
// joinService.getUser: 유효한 토큰에 대해 관련 사용자 정보를 송환

router.post('/', joinService.createUser);
//router.post('./login', joinService.loginAsEmail);
router.get('/FindMe', [joinService.loginAsEmail, authService.authenticate, joinService.getUser]);

// 회원가입 서비스에서 유저를 인증하고 넘어가는 미들웨어를 적용한 경우
// router.post('/', authService.verifyUser, joinService.createUser);
// router.get('/FindMe', joinService.loginAsEmail);
// router.get('FindMe', authService.authenticate, joinService.getUser);


module.exports = router;