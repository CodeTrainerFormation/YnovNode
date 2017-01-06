var express = require('express');
var app = express();
var fs = require('fs');
var querystring = require('querystring');

app.get('/', function(req, res) {
  fs.readFile('views/index.html', 'utf8', function(err, data) {
    res.end(data);
  });
});

app.get('/index', function(req, res) {
  fs.readFile('views/index.html', 'utf8', function(err, data) {
    res.end(data);
  });
});

app.get('/contact', function(req, res) {
  fs.readFile('views/contact.html', 'utf8', function(err, data) {
    res.end(data);
  });
});

app.post('/contact', function(req, res) {

  var data = "";
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    var dataParse = querystring.parse(data);
    console.log(dataParse);
  });

  fs.readFile('views/contact.html', 'utf8', function(err, data) {
    res.end(data);
  });
});

app.get('/api/people', function(req, res) {
  fs.readFile('data/people.json', 'utf8', function(err, data) {
    res.end(data);
  });
});

app.listen(1337, function() {
  console.log('App running');
})
