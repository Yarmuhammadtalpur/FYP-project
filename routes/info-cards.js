const routeInfo = require('express').Router();



routeInfo.get('/central-library', (req, res)=>{
  
    res.render('pages/central-library');
});


routeInfo.get('/sindhology', (req, res)=>{
  
    res.render('pages/Sindhology');
});

routeInfo.get('/student-welfare', (req, res)=>{
  
    res.render('pages/Student-Welfare');
});


routeInfo.get('/US-SCDC', (req, res)=>{
  
    res.render('pages/SCDC');
});





module.exports = routeInfo;