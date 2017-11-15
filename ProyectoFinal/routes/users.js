var express = require('express');
var router =  express.Router();


//Register
router.get('/Register',function(req,res){
    res.render('register');
});

router.get('/login',function(req,res){
    res.render('login');
});

module.exports = router;    