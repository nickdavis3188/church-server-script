const express = require('express');
const journeyDateController = require('../controllers/journeyDateController');
const router = express.Router();

router.post(
    '/journeyDate', 
    journeyDateController.setJourneyDate
  );

router.get(
    '/checkJourneyDate', 
    journeyDateController.journeyDateCheck
  );
  module.exports = router;