'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
      type: String,
	  require: true
  },
  avatar: {
    type: String,
  }
})

module.exports = mongoose.model('User', userSchema);
