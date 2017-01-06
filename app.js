var express = require('express');
var app = express();
var fs = require('fs');
var querystring = require('querystring');

app.get(['/', '/index'], function(req, res) {
  fs.readFile('views/index.html', 'utf8', function(err, data){
    res.end(data);
  });
});

app.get('/category/:name', function(req, res) {
  var name = req.params.name;
  fs.readFile('views/index.html', 'utf8', function(err, data){
    res.end(data);
  });
});

app.get('/post/:id', function(req, res) {
  var id = req.params.id;
  fs.readFile('views/detail.html', 'utf8', function(err, data){
    res.end(data);
  });
});

app.get('/post', function(req, res) {
  fs.readFile('views/post.html', 'utf8', function(err, data){
    res.end(data);
  });
});

app.post('/post', function(req, res) {
  fs.readFile('views/post.html', 'utf8', function(err, data){
    res.end(data);
  });
});

app.get('/public/css/bootstrap.min.css', function(req, res) {
  fs.readFile('public/css/bootstrap.min.css', 'utf8', function(err, data){
    res.end(data);
  });
});

app.listen(1337, function() {
  console.log('App running');
})
