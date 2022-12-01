const passport = require('passport');
const User = require('../models/user');

module.exports.signup = function(req,res){
    return res.render('sign_up');
}

module.exports.login = function(req,res){
    return res.render('log_in');
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log(`error in signup ${err}`); return;}
        if(!user){
            User.create(
                req.body
            ,function(err,user){
                if(err){console.log(`error in signup ${err}`); return res.redirect('back');}
                return res.redirect('/user/signin');
            })
        }else{
            return res.redirect('back');
        }

    })
}

module.exports.createSession = function(req,res){
    
    console.log("User Logged In");
    
    return res.redirect('/translator');
    
}