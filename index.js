const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.end("Server is on");
});

const app = express();

app.use(express.static("views"));

app.use("/apis", router);

app.use((req, res) => {
  res.end("Not Found");
});

app.use((err, req, res, next) => {
  res.json({ code: 0, message: err.message, response: {} });
});

app.listen(3000, () => {
  //console.log("서버 시작: http://kdt-sw-6-team05.elicecoding.com/");
});

/**
 * API 명세 팁
 *
 * 요청 주소
 * 메소드 GET, POST, PUT, PATCH, DELETE
 * 요약 API의 역할
 * [req.params] params /users/{id} => http://localhost:3000/apis/users/asndklsabj21321sdsa
 * [req.query] querystring ?name=elice&age=8
 * [req.body] body (application/json) => "{ "name": "string" }"
 * require
 *
 * response
 * 200 : 성공 => { code: 200, message: "success", response: {} }
 * 400 : 파라미터 누락 => { code: 400, message: "Parameter Missing", response: {} }
 * 403 : 인증 오류 => { code: 403, message: "User Id Missing", response: {} }
 */
