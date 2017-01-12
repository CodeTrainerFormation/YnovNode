var router = require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var data = require('../helpers/data');
var filters = require('../helpers/filters');

var parser = bodyParser.urlencoded({extended: false});

router.get('/:id', function(req, res) {
  var idPost = req.params.id;

  data.loadData('../data/post.json', function(err, data) {
    var posts = JSON.parse(data);
    var post = posts.find(filters.filterByField('id', idPost));
    var postComments = comments.filter(filters.filterByField('postId', idPost));

    res.render('detail.html', { post: post, comments: postComments});
  });

});

router.post('/:id', parser, function(req, res) {
  var idPost = req.params.id;
  var pseudo = req.body.pseudo;
  var comment = req.body.comment;

  comments.push({
    postId: idPost,
    pseudo: pseudo,
    comment: comment
  });

  res.redirect('/post/'+idPost);
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
