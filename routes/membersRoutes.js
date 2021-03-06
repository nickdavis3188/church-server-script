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
    '/bulkAttendance',
    authController.protect,
    membersController.bulkattendance
  );

router.post(
    '/attendUpload',
    authController.protect,
    membersController.attendanceBulkUpload
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


router.post(
  '/bulkUpdateSearch',
  membersController.bulkUpdateSearchData
);

router.post(
  '/bulkUpdate',
  membersController.bulkUpdate
);

//
// router.post('/test',membersController.test)
router.post(
  '/checkJourneyM',
  membersController.cheackSinJourney,
  membersController.cheackJourney
);

router.post(
  '/setNJourney',
  membersController.setNJourney 
);

router.post(
  '/journeyAttendSecond',
  membersController.journeyDateCheck,
  membersController.journeyAttendSecond 
);
router.post(
  '/confirmJourney',
  membersController.confirmJourney 
);

module.exports = router;
