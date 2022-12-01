const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//crypto is used to create a random password while signup if the password field is required
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use new strategy
passport.use(new googleStrategy({
    clientID : "1062037587258-t608471p18b79ti1hvpdecj1csrbdm1m.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:3000/user/auth/google/callback" // data about the user is send back to this url


}, function(accessToken,refreshToken,profile,done){
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            console.log(profile.photos[0].value);
            if(err){
                console.log('error in google-strategy',err);
                return;
            }
            if(user){
                // if found then return the user set this as req.user
                return done(null,user );
            }
            else{
                // if not found then, create the user set this as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex'),
                    
                },function(err,user){
                    if(err){
                        console.log('error in google-strategy',err);
                        return;
                    }
                    
                    return done(null,user);
                })
            }
        })
}

))