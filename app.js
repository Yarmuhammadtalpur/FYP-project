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
    res.render('home');
});

app.get('/home/dean_message', (req, res)=>{

    res.render('dean_page');
});

app.get('/departments/software-engineering', (req, res)=>{
    res.render('dept_software');
});

app.get('/departments/information-technology', (req, res)=>{
    res.render('dept_IT');
});


app.get('/departments/electronics', (req, res)=>{
    res.render('dept_electronics');
});


app.get('/departments/telecommunication', (req, res)=>{
    res.render('dept_telecommunication');
});