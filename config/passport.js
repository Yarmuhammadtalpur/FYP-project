const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const idUser = require('../Model/idusers');

module.exports = (passport)=> {
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, password, done)=>{
            //Match User
            idUser.findOne({email})
                .then(user=>{
                    if(!idUser){
                        return done(null, false, {message: "The Email is not registered"});
                    }

                    //Match Password
                    bcrypt.compare(password, user.password, (err, result)=> {
                        if(err) throw err;

                        if(result){
                            return done(null, user)
                        } else{
                            return done(null, false, {message: "password Incorrect"})
                        }
                    })
                })
                .catch(err=> console.log(err))

        })  
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        idUser.findById(id, function (err, user) {
          done(err, user);
        });
      });


}