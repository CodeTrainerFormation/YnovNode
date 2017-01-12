var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var parser = bodyParser.urlencoded({extended:false});

app.use('/', function(req, res, next) {
  console.log('Coucou middle');
  next();
});

app.get('/', parser, function(req, res) {
  req.body.firstname
  res.end('hello');
});

app.listen(1337);
