// indexRouter.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

const { viewRouter } = require("./viewRouter");
const orderRouter = require("./orderRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const userApiRouter = require('./userApiRouter');
const authApiRouter = require('./authApiRouter');

dotenv.config();

const mongoURI = process.env.MONGO_DB_PATH;
// console.log(mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("mongoose connected"))
.catch((err) => console.error("DB connection fail", err));

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); // req.body 객체 인식용
app.use(express.static('views')); // 정적 파일 미들웨어

// Routers
app.use("/health", (req, res) => { res.end("Server is on")});
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/user", userApiRouter); 
app.use("/auth", authApiRouter);

// Error handlers
app.use((req, res) => {
  res.end("Not Found");
});

app.use((err, req, res, next) => {
  res.json({ code: 0, message: err.message, response: {} });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`서버 시작: http://localhost:${PORT}`);
});

module.exports = app;

/**
 * API 명세 팁
 *
 * 요청 주소
 * 메소드 GET, POST, PUT, PATCH, DELETE
 * 요약 API의 역할
 * [req.params] params /users/{id} => http://localhost:3000/apis/users/asndklsabj21321sdsa
 * [req.query] querystring ?name=이름&age=8
 * [req.body] body (application/json) => "{ "name": "string" }"
 * require
 *
 * response
 * 200 : 성공 => { code: 200, message: "success", response: {} }
 * 400 : 파라미터 누락 => { code: 400, message: "Parameter Missing", response: {} }
 * 403 : 인증 오류 => { code: 403, message: "User Id Missing", response: {} }
 **/
