const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean();
  if (!users?.length)
    return res.status(400).json({ message: 'No users found.' });
  res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username.toLowerCase() }).lean();
  const passwordMatch = await bcrypt.compare(password, user.password);
  const response = { ...user };
  delete response.password;
  if (passwordMatch) return res.json(response);
  return res.status(404).json({ message: 'Incorrect username or password.' });
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  const duplicate = await User.findOne({ username: username.toLowerCase() })
    .lean()
    .exec();
  if (duplicate)
    return res.status(409).json({ message: 'Username is already taken.' });

  const hashedPwd = await bcrypt.hash(password, 10);
  const user = await User.create({
    username: username.toLowerCase(),
    password: hashedPwd,
  });

  const response = await User.findOne({
    username: username.toLowerCase(),
  }).lean();
  if (user) res.json(response);
  else res.status(400).json({ message: 'Invalid user data received' });
});

module.exports = { getAllUsers, getUser, createNewUser };
