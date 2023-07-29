const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createNewUser,
} = require('../controllers/usersController');

router.route('/').get(getAllUsers).post(createNewUser);

module.exports = router;
