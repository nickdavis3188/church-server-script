const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();


router.post(
  '/signup',
  authController.upload.single('adminImg'),
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
  '/resetPassword/:id',
  authController.resetPassword 
);
router.post(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.post(
  '/inviteSignup',
  authController.upload.single('adminImg'),
  authController.inviteAdmin
);
router.post(
  '/allAdmin',
  authController.allAdminExcludingMe
);

router.post(
  '/deleteAdmin',
  authController.deleteAdmin
);

router.post(
  '/archive',
  authController.archiveAdmin
);

router.post(
  '/unArchive',
  authController.unArchiveAdmin
);

router.post(
  '/getSingleAdminById',
  authController.getAdmiinById
);
// unAchiveAdmin

module.exports = router;