const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const { viewRouter } = require("./routes/viewRouter");
const orderRouter = require("./routes/orderRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const authApiRouter = require("./routes/authApiRouter");
const userApiRouter = require("./routes/userApiRouter");

dotenv.config();

const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_DB_PATH;
// console.log(mongoURI);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.error("DB connection fail", err));

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // req.body 객체 인식용
app.use(express.static("views")); // 정적 파일 미들웨어

// Routers
app.use("/", viewRouter);
app.use("/health", (req, res) => {
  res.end("Server is on");
});
app.use("/user", userApiRouter); // 유저 라우터
app.use("/auth", authApiRouter); // 회원가입 라우터
app.use("/order", orderRouter); // 주문 라우터
app.use("/product", productRouter); // 상품 라우터
app.use("/category", categoryRouter); // 카테고리 라우터

// Error handlers
app.use((req, res) => {
  res.status(404).end("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Add this line to log the error
  res.status(500).json({ code: 0, message: err.message, response: {} });
});

app.listen(PORT, () => {
  console.log(`서버 시작: http://localhost:${PORT}`);
});
