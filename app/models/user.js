// var db = require('../configWithMongoose.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});
var User = mongoose.model('user', usersSchema);


  //this has to go on UserSchema.methods.com
  usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      callback(isMatch);
    });
  },
  usersSchema.methods.hashPassword = function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password), null, null).bind(this)
      .then(function(hash) {
        this.password = hash;
      });
  }
});

module.exports = User;

// var User = db.model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
