const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        console.log('inside local-startegy'); 
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if(!user || user.password != password){
            console.log("invalid username/password");
            return done(null,false);
        }
        return done(null, user);
      });
    }
));

passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deserialzing the user

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding the user");
            return done(err);
        }
        return done(null,user);
    })
});

// check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    console.log("inside checkAuthentication");
    console.log(req.body);
    if (req.isAuthenticated()){
        return next();
    }
    
    // if the user is not signed in
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
     if (req.isAuthenticated()){
         // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
         res.locals.user = req.user;
    }

    next();
 }


module.exports = passport;