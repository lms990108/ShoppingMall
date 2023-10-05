const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = express();

require('dotenv').config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use('/api', indexRouter);
const mongoURI = process.env.LOCAL_DB_ADDRESS;

mongoose
.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("mongoose connected"))
.catch((err) => console.error("DB connection fail", err));


app.listen(process.env.PORT || 3000, () => {
    console.log("Server on");
});


