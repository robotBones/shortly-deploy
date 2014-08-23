// var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linksSchema = new mongoose.Schema({
  url: String,
  id: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  createdAt: { type: Date, default: Date.now },
});

linksSchema.pre('save', function(){
  var shasum = crypto.createHash('sha1');
  var oldUrl = this.url;
  shasum.update(oldUrl);
  this.code = shasum.digest('hex').slice(0,5);
});

var Link = new mongoose.model('Link', linksSchema);

module.exports = Link;
