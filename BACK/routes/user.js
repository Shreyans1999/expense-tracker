const express = require('express');
const router = express.Router();
const {signUpUser, loginUser} = require('../controllers/user');

//signup routes
router.post('/signup',signUpUser);

//login routes
router.post('/login',loginUser);

module.exports = router;