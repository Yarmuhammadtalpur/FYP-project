require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { ensureAuthenticated } =require('./config/auth')


const port = process.env.PORT;



// getting admin route
const dashRoute = require('./routes/dashboard')

//geeting timetable Schema
const Timetable = require('./Model/timetable')
const Timetable_eve = require('./Model/timetable_evening')

// getting user schema
const Userdb = require('./Model/user')



const app = express();

//view engine
app.set('view engine', 'ejs');

//middleware
app.use("/public/", express.static(__dirname+"/public/"))
app.use("/uploads",express.static(__dirname+"/uploads/"))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


require('./config/passport')(passport);


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



//Passport Config

app.use(session({
        secret: process.env.sessionSecret,
        resave: false,
        saveUninitialized: true
      }))

app.use(flash())

app.use((req, res, next)=>{
    res.locals.error = req.flash('error')
    next();
})

app.use(passport.initialize());
app.use(passport.session());





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

app.route('/contact-us')

        .get((req, res)=> {
            res.render('contact-us');
        })

        .post((req, res)=>{
            if(!req.body){
                res.status(400).send("error")
                return;
            }

            const user = new Userdb({
                  
                first_Name: req.body.first_Name,
                last_name: req.body.last_name,
                email_address: req.body.email_address,
                message: req.body.message,

            })
            user.save()
            .then( ()=>{

                res.redirect('/contact-us/resp');
            })
            .catch(err=>{
                res.status(500).send("Some Error accured while saving data")
            })

            

            //saving UserData

           
                


        });



app.get('/section/faqs', (req, res)=>{
    res.render('faqs');
});

app.get('/about', (req, res) =>{ 
    res.render('about');
});

//timetable Morning

app.get('/timetable/morning', (req, res) =>{ 

    Timetable.find({}, (err, foundItem)=>{
        
        res.render('timetable_morning',{
                timetable: foundItem
            });


    })
    


});


app.get('/timetable/morning', (req, res) =>{ 

    Timetable.find({}, (err, foundItem)=>{
        
        res.render('timetable_morning',{
                timetable: foundItem
            });


    })
    


});

app.get('/timetable/morning/:path_id', (req, res) =>{ 

    const table_id = req.params.path_id

    Timetable.findOne({_id: table_id}, (err, foundItem)=>{
        
        res.render('timetable_morning_selected',{
                timetable: foundItem
            });


    })
    


});

//timetable Evening



app.get('/timetable/evening', (req, res) =>{ 

    Timetable_eve.find({}, (err, foundItem)=>{
        
        res.render('timetable_evening',{
                timetable: foundItem
            });


    })
    


});

app.get('/timetable/evening/:path_id', (req, res) =>{ 

    const table_id = req.params.path_id

    Timetable_eve.findOne({_id: table_id}, (err, foundItem)=>{
        
        res.render('timetable_evening_selected',{
                timetable: foundItem
            });


    })
    


});




//admin Side

app.get('/login', (req, res)=>{
    res.render('login');
    
});

app.post('/login', (req, res, next)=>{

    passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true
        
    })(req, res, next);
});


app.use('/dashboard',ensureAuthenticated, dashRoute);







app.get('/newsletter', (req, res)=>{
    res.render('formfilled',{
        formtp: "Thankyou, For applying for our daily Newsletter, We'll keep you updated"
    });
})

app.get('/contact-us/resp', (req, res)=>{
    res.render('formfilled',{
        formtp: "Informatin Received, Thankyou, We'll get in touch with you."
    });
})