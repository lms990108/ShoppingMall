// 주 서버 파일로 작동

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./index'); //index.js를 라우터로 불러옴

const app = express();

require('dotenv').config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); // req.body 객체 인식용

app.use(express.static('views')); // 정적 파일 미들웨어

app.use('/api', indexRouter); // indexRouter을 연결

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("mongoose connected"))
.catch((err) => console.error("DB connection fail", err));

app.listen(process.env.PORT || 5001, () => {
    console.log("Server on");
});
