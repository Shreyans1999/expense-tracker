const User = require('../models/userModel');
const { createToken, signup, login } = require('../utilities/authUtils');

// Login user service
const loginUserService = async (username, password) => {
  const user = await login(username, password);
  const token = createToken(user._id);
  return { username, token };
};

// Signup user service
const signupUserService = async (username, email, password) => {
  const user = await signup(username, email, password);
  const token = createToken(user._id);
  return { username, email, token };
};

module.exports = {
  loginUserService,
  signupUserService
}; 