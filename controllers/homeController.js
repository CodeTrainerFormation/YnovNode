var router = require('express').Router();
var fs = require('fs');

router.get(['/', '/index'], function(req, res) {
  fs.readFile(__dirname + '/../views/index.html', 'utf8', function(err, data){
    console.log(err);
    res.end(data);
  });
});

router.get('/category/:name', function(req, res) {
  var name = req.params.name;
  fs.readFile('views/index.html', 'utf8', function(err, data){
    res.end(data);
  });
});

module.exports = router;
