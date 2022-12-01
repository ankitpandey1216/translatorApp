const express = require('express');
const port = 3000;

const app = express();

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

//miidleware for parsing request.body
app.use(express.urlencoded());


const cookieParser = require('cookie-parser');




app.use(cookieParser());

// setting up the static files
app.use(express.static('./assets'));

//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');





app.use(session({
    name : "tranlator",
    secret : "hellotranslator", // key for encryption
    //TODO change the secret before the deployment
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 1000*60*100
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://localhost/translator_user_list',
        autoRemove : 'disabled'
    },function(err){
        console.log(err || "session cookie stored in mongo store");
    })
    

}))

app.use(passport.initialize()); // midlleware to tell app to use passport
app.use(passport.session()); // passport also helps in session
// app.use(passport.setAuthenticatedUser());
app.use(passport.setAuthenticatedUser);

// app.use(flash());
// app.use(customMware.setFlash);
// setting up the router
const router = require('./routers');

app.use('/',require('./routers'));



app.listen(port,function(err){
    if(err){
        console.log(`Error in firing up the server : ${err}`);
        return;
    }
    console.log(`server is up and running at port ${port}`);
});