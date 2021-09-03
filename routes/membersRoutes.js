const express = require('express');
const membersController = require('../controllers/membersCollection')
const authController = require('../controllers/authController');
//const xlmulter = require('../utils/multer');

const router = express.Router();
router.get(
  '/getSingleMember/:id',
  membersController.singleMember 
)
router.post(
    '/memberRegistration',
    authController.protect,
    membersController.memberRegistration
  );

router.post(
    '/bulkUpload',
    authController.protect,
    membersController.membersBulkUpload,
  );

router.post(
  '/attendance',
  membersController.Attendace
)
  

module.exports = router;