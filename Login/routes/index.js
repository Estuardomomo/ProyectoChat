var express = require('express');
var router = express.Router();
var User = require('../lib/User');
//CAPA DE PROCESOS ALTERNOS
var edge = require('edge');
var Cifrar = edge.func({
  assemblyFile: "Libreria.dll",
  typeName: "Libreria.Sdes",
  methodName: "Cifrar"
});
var Descifrar = edge.func({
    assemblyFile: "Libreria.dll",
    typeName: "Libreria.Sdes",
    methodName: "Descifrar"
  });
  var Comprimir = edge.func({
    assemblyFile: "Libreria.dll",
    typeName: "Libreria.Huffman",
    methodName: "HComprimir"
  });
  var Descomprimir = edge.func({
    assemblyFile: "Libreria.dll",
    typeName: "Libreria.Huffman",
    methodName: "HDescomprimir"
  });
/*
Descifrar('lo que quiero descifrar', function (error, result) {
    if(error) throw error;
    console.log(result);
  });
Comprimir('Archivo.txt', function (error, result) {
    if(error) throw error;
    console.log(result);
    var ruta = result;
  });
Descomprimir(ruta, function (error, result) {
    if(error) throw error;
    console.log(result);
  });
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res) {
  var username = req.body.u;
  var password;
  Cifrar(req.body.c, function (error, result) {
    if(error) throw error;
    password =result;
  });
  User.findOne({username: username, password: password}, function(err, user){
    if(err)
      {
        console.log(err);
        return res.status(500).send();
      }
      if(!user)
      {
        return res.status(404).send();
      }
      req.session.user = user;
      return res.render('chat', {atributo: username})
  })
});

router.get('/chat', function(req, res) {
  if(!req.session.user){
    return res.status(401).send();
  }
  console.log(req.session.user);
  return res.render('chat');
})

router.get('/logout', function(req, res){
  req.session.destroy();
  return res.render('index');
})

router.post('/register', function(req, res) {
  var username = req.body.nu;
  var password;
  Cifrar(req.body.nc, function (error, result) {
    if(error) throw error;
    console.log('Contraseña: '+result);
    password =result;
  });
  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  newuser.save(function(err, savedUser){
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.render('postregistro');
  })
})

module.exports = router;
