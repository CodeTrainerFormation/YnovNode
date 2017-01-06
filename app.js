var express = require('express');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.use('/', require('./controllers'));

app.listen(1337, function() {
  console.log('App running');
})
