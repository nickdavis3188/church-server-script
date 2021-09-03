const express = require('express');
const searchController = require('../controllers/searchController');
const router = express.Router();

router.route('/').post(searchController.getSearchResult);

module.exports = router;
