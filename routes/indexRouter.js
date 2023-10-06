// index.js

const express = require('express');
const router = express.Router();
const userApi = require('./routes/userApiRouter');
const authApi = require('./routes/authApiRouter');
//const productApi = require('./product.api');


router.use('/user', userApi);
router.use('/auth', authApi);
//router.use('/product', productApi);

module.exports = router;