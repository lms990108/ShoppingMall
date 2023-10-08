// [김효인 라우터 설정] - 이건 나중에 삭제할 것 같아요.
// 라우터 모듈로만 사용
// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.end("Server is on");
// });

//

// module.export = router;

const express = require("express");
const mongoose = require("mongoose");

const { viewRouter } = require("./routes/viewRouter");
const orderRouter = require("./routes/orderRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
//const authApiRouter = require("./routes/authApiRouter");
//const indexRouter = require("./routes/indexRouter");
//const userApiRouter = require("./routes/userApiRouter");

const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const mongoURI = process.env.MONGO_DB_PATH;
// console.log(mongoURI)

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

router.get("/health", (req, res) => {
  res.end("Server is on");
});

const app = express();

app.use(express.json());
app.use(express.static("views"));

app.use("/apis", router);
app.use("/order", orderRouter); // 주문 라우터
app.use("/product", productRouter); // 상품 라우터
app.use("/category", categoryRouter); // 카테고리 라우터

//app.use("/index", indexRouter'); // 인덱스 라우터

app.use((req, res) => {
  res.end("Not Found");
});

app.use((err, req, res, next) => {
  res.json({ code: 0, message: err.message, response: {} });
});

app.listen(5001, () => {
  console.log("서버 시작: http://localhost:5001");
});

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
 */
