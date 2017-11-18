var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');
var session = require('express-session');
var server = require('http').createServer(app);
var index = require('./routes/index');
var users = require('./routes/users');
var io = require('socket.io').listen(server);
var app = express();
var arreglo =[];
var connections = [];
io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  //Disconnections
  socket.on('disconnect',function(data){

      arreglo.splice(arreglo.indexOf(socket.username),1);
      updateUsernames();
      connections.splice(connections.indexOf(socket),1);
      console.log('Disconnected: %s sockets connected', connections.length);
  
  });
  
  //Send Message
  socket.on('send message', function(data){
      console.log(data);
      io.sockets.emit('new message',{msg:data,user: socket.username});
  });

  //new User
  socket.on('new user', function(data,callback){
      callback(true);
      socket.username = data;
      arreglo.push(socket.username);
      updateUsernames();
  });
function updateUsernames(){
  io.sockets.emit('get arreglo', arreglo);
}
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "23kljñ2ñlj21ñljasd9", resave: false, saveUninitialized: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
