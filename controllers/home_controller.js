module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        return res.render('home');
    }
    return res.redirect('/');
}

