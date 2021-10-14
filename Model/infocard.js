const mongoose = require('mongoose');

const infocardSchema = mongoose.Schema({
    Title:{
        type: String
    },
    info:{
        type: String    
    },

    file_doc:{
        type: String
    }
})

const infocard = mongoose.model('Information Cards', infocardSchema);


module.exports = infocard