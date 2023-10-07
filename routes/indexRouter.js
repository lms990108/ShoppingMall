// index.js

const express = require('express');
const router = express.Router();
const userApiRouter = require('./routes/userApiRouter');
const authApiRouter = require('./routes/authApiRouter');

router.use('/user', userApiRouter); 
router.use('/auth', authApiRouter);

module.exports = router;