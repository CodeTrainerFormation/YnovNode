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
  res.render('post.html');
});

router.post('/', parser, function(req, res) {
  var title = req.body.title;
  var author = req.body.author;
  var category = req.body.category;

  data.loadData('post.json', function(err, data) {
    var maxId = 0;
    var posts = JSON.parse(data);
    posts.forEach(function(post) {
      if(post.id > maxId) {
        maxId = post.id;
      }
    });

    posts.push({
      id: ++maxId,
      title: title,
      author: author,
      category: category,
      picture: ""
    });

    var dataJson = JSON.stringify(posts);

    fs.writeFile(__dirname + '/../data/post.json', dataJson, function(err) {
      res.redirect('/');
    })
  });
});

module.exports = router;
