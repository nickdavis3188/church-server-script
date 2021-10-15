const express = require('express');
const dashboradController = require('../controllers/dashboradCollection');
const authController = require('../controllers/authController');
const router = express.Router();

router.get(
    '/static', 
    dashboradController.dashboarStatic
  );

router.post(
    '/dashboradStatistics',
    dashboradController.statisticsDashborad
);

router.post(
    '/attendanceDashborad',
    dashboradController.attendanceDashborad
);

module.exports = router;