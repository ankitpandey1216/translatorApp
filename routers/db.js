const express = require('express');
const router = express.Router();
const dbController = require('../controllers/db_controller');

router.get('/info',dbController.info);

module.exports = router;