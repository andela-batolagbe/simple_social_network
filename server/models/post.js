'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  user: {
      type: Schema.Types.ObjectId,
	  ref: 'User'
  },
  text: {
    type: String,
	require: true
  },
  dateCreated: {
    type: Date
  }
})

module.exports = mongoose.model('Post', postSchema);
