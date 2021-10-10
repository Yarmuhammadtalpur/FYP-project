const routeLog = require('express').Router();
const mongoose = require('mongoose');

const idUser = require('../Model/idusers');




routeLog.get('/new-user', (req, res)=>{


    res.render('dash_signup');


    
});

routeLog.post('/new-user', (req, res)=>{

    const { name, email, password, password2  } = req.body

    //error Messages 
    let errorMessage = [];

    //check all fields
    if(!name || !email || !password || !password2 ){
        errorMessage.push({msg : "Please Enter All Fields."});
    }

    //check password match
    if(password !== password2){
        errorMessage.push( {msg : "Passwords Don't Match"});
    }

    // check password length
    if(password.length < 7 && password.length > 1 ){
        errorMessage.push( {msg : "Password too Short"});
    }
    

    if(errorMessage.length > 0){
        res.render('dash_signup',{
            errorMessage,
            name,
            email,
            password,
            password2
        })

    }   else{

        res.send("Success");

    }


});


routeLog.get('/signout', (req, res)=>{
    res.send("LogOut")
});


module.exports = routeLog
