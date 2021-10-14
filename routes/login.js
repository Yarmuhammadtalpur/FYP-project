const routeLog = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const idUser = require('../Model/idusers')




routeLog.get('/new-user', (req, res)=>{


    res.render('dash_signup',{
        useridname: req.user.name
    });

    
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

        // Form validation passed
        
        idUser.findOne({email})
            .then(user =>{

                if(user){
                //User Exists
                    errorMessage.push({msg: "Email Already Registered."})
                    res.render('dash_signup',{
                        errorMessage,
                        name,
                        email,
                        password,
                        password2
                    });
                } else{

                    bcrypt.hash(password, 11, function(err, hash) {
                        const newUser = new idUser({
                            name,
                            email : email.toLowerCase(),    
                            password: hash,
                        })

                        newUser.save();
                    });
                    
                    res.render('dashboard-user-added',{
                        formtp: "User Successfully Added"
                    })
                    


                
                }

            });

    }





});

routeLog.get('/signout', (req, res)=>{
    req.logOut();
    res.redirect('/login')
});


module.exports = routeLog
