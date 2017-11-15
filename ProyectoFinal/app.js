
//Express Server
const express = require('express');
var app = express();


//Variable declaration
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expHandlerB = require('express-handlebars');
var expValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrat = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/usuarios', function(err,res){
    if(err)
        console.log('ERROR: coneccion con la base de datos fallida: ' + err);
    else
        console.log('Coneccion con la base de datos existosa.');    
});

var db = mongoose.connection;
var assert = require('assert');
//para mensajes
var http = require('http').Server(app);

//Sets the routes
var routesI = require('./routes/index');
var users = require('./routes/users');


//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expHandlerB({extname:'handlebars' ,defaultLayout:'layout',layoutsDir: __dirname + 'views/layouts/'}));
app.set('view engine','handlebars');

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());

//Setting the public Folder
app.use(express.static(path.join(__dirname,'public')));

//Setting Express-session
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave:true
}));


//Passport INIT
app.use(passport.initialize());
app.use(passport.session());

//Validator Middleware settings
app.use(expValidator({
    errorFormatter: function(param,msg,value){
        var nameSpace = param.split('.')
        , root =  nameSpace.shift()
        ,formParam = root;

        while(nameSpace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        
        return{
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

//Flash
app.use(flash);

//Global function for Flash
app.use(function(req,res,next){
    res.locals.succes_msg = req.flash('succes_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//Main Page
app.use('/',routesI);
app.use('/users',users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server initialized at ' + app.get('port'));
});


