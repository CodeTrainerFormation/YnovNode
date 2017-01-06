var router = require('express').Router();
var fs = require('fs');
var data = require('../helpers/data');

router.get(['/', '/index'], function(req, res) {
  data.loadData('post.json', function(err, posts) {
    console.log(posts);
    res.render('index.html', { posts: JSON.parse(posts) });
  });
});

router.get('/category/:name', function(req, res) {
  var name = req.params.name;

  var filterByCategory = function(n) {
    return function(elem) {
      return elem.category == n;
    }
  }

  data.loadData('post.json', function(err, posts) {
    var postFiltered = JSON.parse(posts).filter(filterByCategory(name));
    res.render('index.html', { posts : postFiltered });
  });

});

module.exports = router;
