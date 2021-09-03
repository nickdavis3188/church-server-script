const express = require('express');

const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();


//Get all Sales Rep
router.get(
  '/profile',
  authController.protect,
  adminController.getSingleDetails
);

router.post(
  '/inviteAdmin',
  authController.protect,
  authController.inviteAdmin
);

module.exports = router;
