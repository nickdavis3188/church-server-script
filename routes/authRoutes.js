const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();


router.post(
  '/signup',
  authController.signup,
);
router.post(
  '/signin',
  authController.login,
);

router.get(
	'/checklog',
	authController.protect,
	authController.cheackLog
);


router.post(
  '/signout',
  authController.protect,
  authController.logout
);
router.post(
  '/forgotPassword',
  authController.forgotPassword
);
router.post(
  '/resetPassword',
  authController.confirmResetCode,
  authController.resetPassword
);
router.post(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

module.exports = router;