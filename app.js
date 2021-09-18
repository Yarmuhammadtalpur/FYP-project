require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;


const app = express();

//view engine
app.set('view engine', 'ejs');

//middleware
app.use("/public", express.static(__dirname+"/public"))
app.use(express.urlencoded({
    extended: true
}));



//database connection then Starting Server
mongoose.connect(process.env.mongodb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((result)=>{
        app.listen(port, (req, res) => {
        console.log("Your Server and Database is connected")
         })
    })
    .catch((err)=> console.log("Unable to Start: "+err))




app.get('/', (req, res) => {
    res.render('home')
})