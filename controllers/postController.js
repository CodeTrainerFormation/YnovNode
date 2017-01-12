var router = require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var data = require('../helpers/data');
var filters = require('../helpers/filters');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/imgs');
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(err, raw.toString('hex') + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    var extensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    var ext = mime.extension(file.mimetype);
    if(extensions.indexOf(ext) != -1) {
      cb(null, true);
    }else {
      cb(new Error('Fichier incorrect'));
    }
  }
}).single('picture');

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

router.post('/', function(req, res) {

  upload(req, res, function(err) {

    if(err) {
      return res.render('post.html', { error: err.message});
    }

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
        picture: req.file.path
      });

      var dataJson = JSON.stringify(posts);

      fs.writeFile(__dirname + '/../data/post.json', dataJson, function(err) {
        res.redirect('/');
      })
    });
  });
});

module.exports = router;
