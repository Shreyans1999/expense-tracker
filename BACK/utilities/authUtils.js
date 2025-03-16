const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel');

// Create JWT token
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
};

// Signup function (moved from userModel.js)
const signup = async (username, email, password) => {
  // Validation
  if(!username || !email || !password) {
    throw Error("All fields must be required");
  }
  if(!validator.isEmail(email)) {
    throw Error("Enter a valid Email");
  }
  if(!validator.isStrongPassword(password)) {
    throw Error("Enter a Strong Password");
  }
  
  const emailExists = await User.findOne({email});
  const userExists = await User.findOne({username});
  if(userExists || emailExists) {
    throw Error('Email or Username already in Use');
  }

  // Password hashing using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({username, email, password: hash});
  return user;
};

// Login function (moved from userModel.js)
const login = async (username, password) => {
  if(!username || !password) {
    throw Error("All fields are required");
  }
  
  const user = await User.findOne({username});
  if(!user) {
    throw Error('Incorrect Username or Password');
  }
  
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    throw Error('Incorrect Username or Password');
  }
  
  return user;
};

module.exports = {
  createToken,
  signup,
  login
}; 