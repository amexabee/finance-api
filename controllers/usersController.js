const User = require('../models/User');
const Business = require('../models/Business');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean();
  if (!users?.length)
    return res.status(400).json({ message: 'No users found.' });
  res.json(users);
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate)
    return res.status(409).json({ message: 'Username is already taken.' });

  const hashedPwd = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPwd });

  if (user) res.status(201).json({ message: `Welcome ${username}` });
  else res.status(400).json({ message: 'Invalid user data received' });
});

module.exports = { getAllUsers, createNewUser };
