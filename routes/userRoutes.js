const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createNewUser,
} = require('../controllers/usersController');

router.route('/').get(getAllUsers).post(createNewUser);
router.route('/login').get(getUser);

module.exports = router;
