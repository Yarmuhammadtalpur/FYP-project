const mongoose = require('mongoose');

const timetableSchema = mongoose.Schema({
    betch:{
        type: String
    },
    dept:{
        type: String    
    },
    file_doc:{
        type: String
    }
})

const Timetable = mongoose.model('Timetable_evening', timetableSchema);


module.exports = Timetable