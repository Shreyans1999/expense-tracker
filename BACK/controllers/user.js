const { loginUserService, signupUserService } = require('../services/userService');
const asyncHandler = require('../utilities/asyncHandler');

// Login user controller
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUserService(username, password);
  res.status(200).json(result);
});

// Signup user controller
const signUpUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const result = await signupUserService(username, email, password);
  res.status(200).json(result);
});

module.exports = { signUpUser, loginUser };