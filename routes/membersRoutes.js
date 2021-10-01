const express = require('express');
const membersController = require('../controllers/membersCollection')
const authController = require('../controllers/authController');
//const xlmulter = require('../utils/multer');

const router = express.Router();
router.post(
  '/getSingleMember',
  membersController.singleMember 
);

router.post(
  '/getSingleMemById',
  membersController.idSearch 
);

router.post(
    '/memberRegistration',
    membersController.upload.single('memberImg'),
    membersController.memberRegistration
  );

router.post(
    '/bulkUpload',
    authController.protect,
    membersController.membersBulkUpload
  );

router.post(
  '/attendance',
  membersController.journeyDateCheck,
  membersController.Attendace
)
router.post(
  '/memberUpdate/:id',
  membersController.updateUser
)

router.post(
  '/deleteMember',
  membersController.deleteMember
);

router.post('/fuploads',membersController.singleFile)
  

module.exports = router;