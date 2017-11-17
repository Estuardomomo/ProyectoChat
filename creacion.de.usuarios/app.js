var express = require('express');
var bodyP = require('body-parser');
var app = express.Router();
var urlencodedParser = bodyP.urlencoded({extended:false});

var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://1270.0.0.1/mongocreate';
app.post('/',function(req,res,next){
    var items = {
        name:req.body.name,
        lastname:req.body.lastname,
        email: req.body.email,
        password:req.body.passcode
    };

    mongo.connect(url,function(err,db){
            assert.equal(null,err);
            db.collection('user').insertOne(items,function(err,res){
                assert.equal(null,err);
                db.close();
            });

    });
});

app.get('/get',function(req,res,next){
    var result = [];
    mongo.connect( url,function(err,db){
        assert.equal(null,err);
        var cursor = db.collection('user').find();
        cursor.forEach(function(doc,err){
            assert.equal(null,err);
            result.push(doc);
        },function(){
            db.close();
            res.render('data',{items:result});
        });
    });
});
module.exports = app;