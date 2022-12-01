const express = require('express');
const router = express.Router();
const homeConroller = require('../controllers/home_controller');
const userController = require('../controllers/userController');
const passport = require('passport');



router.get('/',userController.signup);
router.get('/translator',homeConroller.home);
// router.use('/signup',require('./user'));
// router.use('/login',require('./user'));
router.use('/user',require('./user'));


module.exports = router;

