const express = require('express');
const membersController = require('../controllers/membersCollection')
const authController = require('../controllers/authController');
//const xlmulter = require('../utils/multer');

const router = express.Router();
router.post(
  '/getSingleMember',
  membersController.singleMember 
)
router.post(
    '/memberRegistration',
    membersController.upload.single('memberImg'),
    membersController.memberRegistration
  );

router.post(
    '/bulkUpload',
    authController.protect,
    membersController.membersBulkUpload,
  );

router.post(
  '/attendance/:id',
  membersController.Attendace
)
router.post(
  '/memberUpdate/:id',
  membersController.updateUser
)
router.post('/fuploads',membersController.upload.single('memberImg') ,membersController.singleFile)
  

module.exports = router;