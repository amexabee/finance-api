const express = require('express');
const router = express.Router();
const {
  getBusiness,
  createBusiness,
  deleteBusiness,
} = require('../controllers/businessController');

router.route('/').get(getBusiness).post(createBusiness).delete(deleteBusiness);

module.exports = router;
