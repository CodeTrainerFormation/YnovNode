var db = require('../config/db');

var Schema = db.Schema;

var postSchema = new Schema({
  category: 'String',
  author: 'String',
  picture: 'String',
  title: 'String'
});

var Post = db.model('Post', postSchema);

module.exports = Post;
