var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {

  if(req.method == "GET") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if(req.url == "/" || req.url == "/index") {
      fs.readFile('views/index.html', 'utf8', function(err, data) {
        res.end(data);
      });
    }else if(req.url == "/contact") {
      fs.readFile('views/contact.html', 'utf8', function(err, data) {
        res.end(data);
      });
    } else if(req.url == "/api/people") {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      fs.readFile('data/people.json', 'utf8', function(err, data) {
        res.end(data);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      fs.readFile('views/404.html', 'utf8', function(err, data) {
        res.end(data);
      });
    }
  }
  else if(req.method == "POST") {
    if(req.url == "/contact") {

      var data = "";
      req.on('data', function(chunk) {
        data += chunk;
      });

      req.on('end', function() {
        var dataParse = querystring.parse(data);
        console.log(dataParse);
      });
    }
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    fs.readFile('views/404.html', 'utf8', function(err, data) {
      res.end(data);
    });
  }

});

server.listen(1337, function() {
  console.log('server running');
});
