const { application } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.get('/signup',userController.signup);

router.get('/signin',userController.login);

router.get('/login',passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}
    ),userController.createSession);


router.post('/create',userController.create);

router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/user/signin'}),userController.createSession);

module.exports = router;