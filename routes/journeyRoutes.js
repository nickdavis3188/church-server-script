const express = require('express');
const journeyController = require('../controllers/journeyController');
const router = express.Router();

router.route('/alljourney').get(journeyController.findAllJourney);

router.route('/journeySingle').post(journeyController.findSingleJourney);

router.route('/journey').post(journeyController.journeyRegistration);

router.route('/journeyUpdate/:id').post(journeyController.updateJourney);

module.exports = router;