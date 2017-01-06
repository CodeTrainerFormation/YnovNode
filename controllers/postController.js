var router = require('express').Router();
var fs = require('fs');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  fs.readFile('views/detail.html', 'utf8', function(err, data){
    res.end(data);
  });
});

router.get('/', function(req, res) {
  fs.readFile('views/post.html', 'utf8', function(err, data){
    res.end(data);
  });
});

router.post('/', function(req, res) {
  fs.readFile('views/post.html', 'utf8', function(err, data){
    res.end(data);
  });
});

module.exports = router;
