const express = require('express');
const router = express.Router();
const {
  getBusiness,
  createBusiness,
} = require('../controllers/businessController');

router.route('/').get(getBusiness).post(createBusiness);

module.exports = router;
