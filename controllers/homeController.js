var router = require('express').Router();
var fs = require('fs');
var data = require('../helpers/data');
var filters = require('../helpers/filters');

router.get(['/', '/index'], function(req, res) {
  data.loadData('post.json', function(err, posts) {
    res.render('index.html', { posts: JSON.parse(posts) });
  });
});

router.get('/category/:name', function(req, res) {
  var name = req.params.name;

  data.loadData('post.json', function(err, posts) {
    var postFiltered = JSON.parse(posts).filter(filters.filterByField('category', name));
    res.render('index.html', { posts : postFiltered });
  });

});

module.exports = router;
