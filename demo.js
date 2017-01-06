var express = require('express');
var app = express();

app.use('/', function(req, res, next) {
  console.log('Coucou middle');
  next();
});

app.get('/', function(req, res) {
  res.end('hello');
});

app.listen(1337);
