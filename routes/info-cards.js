const routeInfo = require('express').Router();


//lms

routeInfo.get('/lms', (req, res)=>{
  
    res.render('pages/LMS');
});

routeInfo.get('/lms/login', (req, res)=>{
    res.render('pages/LMS_LogIn')
})

routeInfo.get('/lms/exam_result', (req, res)=>{
    res.render('pages/exam_result_check')
})

//scholarships
routeInfo.get('/ehsass', (req, res)=>{
  
    res.render('pages/ehsass');
});

routeInfo.get('/ehsass/registerId', (req, res)=>{
  
    res.render('pages/ehsass_registerId');
});

//HEC

routeInfo.get('/HEC_scholarships', (req, res)=>{
  
    res.render('pages/HEC_scholarships');
});



routeInfo.get('/student-welfare', (req, res)=>{
  
    res.render('pages/Student-Welfare');
});

routeInfo.get('/scholarships', (req, res)=>{
  
    res.render('pages/Scholarships');
});

routeInfo.get('/US-SCDC', (req, res)=>{
  
    res.render('pages/SCDC');
});





module.exports = routeInfo;