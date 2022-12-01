const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/translator_user_list');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error'));

db.once('open',function(){
    console.log('Succesfully connected to the database');
})