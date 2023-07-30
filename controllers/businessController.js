const Business = require('../models/Business');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getBusiness = asyncHandler(async (req, res) => {
  const items = await Business.find().lean();
  if (!items?.length)
    return res.status(400).json({ message: 'No business found.' });
  res.json(items);
});

const createBusiness = asyncHandler(async (req, res) => {
  const { userID, title, description, income, spending } = req.body;

  const user = await User.findById(userID).lean().exec();
  if (!user) return res.status(409).json({ message: 'Please sign in first.' });

  if (!title || !description || !income || !spending)
    return res.status(400).json({ message: 'All fields are required.' });

  const item = await Business.create({
    owner: user.username,
    title,
    description,
    income,
    spending,
  });

  if (item) res.status(201).json({ message: `Business ${item.title} added` });
  else res.status(400).json({ message: 'Invalid data received' });
});

module.exports = { getBusiness, createBusiness };
