var mongoose = require('mongoose');
var schema = mongoose.Schema;

var usuarios = new schema({
    nombre: String,
    password:String,
    email:String,
});


module.exports = mongoose.model('Usuarios', usuarios);