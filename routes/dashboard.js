const route = require('express').Router();
const mongoose = require('mongoose');
const Userdb = require('../Model/user')
const Timetable = require('../Model/timetable');
const timetable_evening = require('../Model/timetable_evening');
const logRoute = require('../routes/login');
const idUser = require('../Model/idusers')
var moment = require('moment');

const fs = require('fs')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);

    }

});

const fileFilter = (req, file, cb)=>{

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else {
        console.log('File type Not supported')
        cb(new Error("File type Not supported"), false)
    }
    
};

const upload = multer(
    {storage: storage,
     limits: {
    fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter


});

//login system




route.use('/', logRoute)




// dashBoard

route.get('/', (req, res)=>{
  
    res.render('dashboard',{
        useridname: req.user.name
    });
});

route.get('/User-Queries', (req, res)=>{


    Userdb.find({}, (err, foundItem)=>{
        res.render("dash_user-list", {
            user: foundItem,
            useridname: req.user.name
    
        })
    })
});

route.post('/User-Queries', async(req, res)=>{

    
    let user_id = req.body.Id_no;
    try{
    await Userdb.deleteOne({_id: user_id});
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/dashboard/User-Queries');
    
})


route.get('/User-Queries/message/:path', (req, res)=>{

    let routerparam = req.params.path

    Userdb.findOne({ _id: routerparam }, (err, foundItem)=>{
        
        res.render("dash_user_message", {
            name: foundItem.first_Name,
            message: foundItem.message,
            useridname: req.user.name
        })
    })

})


route.get('/update-timetable', (req, res)=>{
    
        res.render("dash_timetable.ejs",{
            useridname: req.user.name
        })
});




//timetable Morning

route.get('/update-timetable/morning', (req, res)=>{
    


    Timetable.find({}, (err, foundItem)=>{
        res.render("dash-timetable-morning", {
            timetable: foundItem,
            useridname: req.user.name
    
        })
    })
});



route.post('/update-timetable/morning', async(req, res)=>{

    let timetable = req.body.timetable_id;
    try{
    
        await Timetable.findOneAndDelete({_id: timetable}, (err, foundItem)=>{

            const path = foundItem.file_doc;

            fs.unlink(path, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              
                //file removed
              })

        })

    }
    catch(e){
        console.log(e)
    }
    res.redirect('/dashboard/update-timetable/morning');
    
})






route.get('/update-timetable/morning/update', (req, res)=>{


    res.render('dash_update_timetable_morning',{
        useridname: req.user.name
    });

    
});


// uploading files to database
//

route.post('/update-timetable/morning/update', upload.single('file_table'), (req, res)=>{

    console.log(req.file)

    const timetable = new Timetable({
                  
        betch: 'Morning',
        dept: req.body.Dept_name,
        file_doc: req.file.path

    })

    timetable.save()
    .then( ()=>{

        res.redirect('/dashboard/update-timetable/morning');
    })
    .catch(err=>{
        res.status(500).send("Some Error accured while saving data")
    })



});


//timetable Evening
route.get('/update-timetable/evening', (req, res)=>{
    


    timetable_evening.find({}, (err, foundItem)=>{
        res.render("dash-timetable-evening", {
            timetable: foundItem,
            useridname: req.user.name
    
        })
    })
});



route.post('/update-timetable/evening', async(req, res)=>{

    let timetable = req.body.timetable_id;
    try{
    await timetable_evening.deleteOne({_id: timetable});

    }
    catch(e){
        console.log(e)
    }
    res.redirect('/dashboard/update-timetable/evening');
    
})






route.get('/update-timetable/evening/update', (req, res)=>{


    res.render('dash_update_timetable_evening',{
        useridname: req.user.name
    });

    
});


// uploading files to database
//

route.post('/update-timetable/evening/update', upload.single('file_table'), (req, res)=>{

    console.log(req.file)

    const timetable = new timetable_evening({
                  
        betch: 'Evening',
        dept: req.body.Dept_name,
        file_doc: req.file.path

    })

    timetable.save()
    .then( ()=>{

        res.redirect('/dashboard/update-timetable/evening');
    })
    .catch(err=>{
        res.status(500).send("Some Error accured while saving data")
    })



});


//Adding New User

route.get('/registered-ids', (req, res)=>{


    idUser.find({}, (err, foundItem)=>{
        res.render("dash_registered-id.ejs", {
            user: foundItem,
            moment,
            useridname: req.user.name
    
        })
    })
});


route.post('/registered-ids', async(req, res)=>{

    
    let user_id = req.body.Id_no;
    try{
    await idUser.deleteOne({_id: user_id});
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/dashboard/registered-ids');
    
})







module.exports = route