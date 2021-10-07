const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    first_Name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email_address:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }

})


const Userdb = mongoose.model('User_list', userSchema);

module.exports = Userdb