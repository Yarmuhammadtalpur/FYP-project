const routeInfo = require('express').Router();



routeInfo.get('/lms', (req, res)=>{
  
    res.render('pages/LMS');
});

routeInfo.get('/ehsass', (req, res)=>{
  
    res.render('pages/ehsass');
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