const express = require('express');
const reportController = require('../controllers/reportController')

const router = express.Router();

router.post(
  '/reportData',
  reportController.getReport
);

module.exports = router;