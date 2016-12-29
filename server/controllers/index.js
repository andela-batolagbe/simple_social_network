'use strict';

var cloudinary = require('cloudinary');
var config = require('../../configs/config');
var User = require('../models/user');
var Post = require('../models/post');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

var defaultAvatar = 'https://res.cloudinary.com/dabdvstcm/image/upload/v1482930184/q9rsppykfogw62ciae2m.png';

function uploadAvatar(file, cb) {
  //upload file to the cloudinary web-server
  cloudinary.uploader.upload(file, function(response) {
    if (response.error) {
	  return cb({ error: response.error });
	}
	return cb({ error: null, url: response.secure_url });
  });
}

module.exports = {
  createUser: function(req, res) {
	if (!req.body.username) {
	  return res.status(401).send({
		 error: true,
		 message: 'No or invalid username provided'
	   });
	}
	if (req.file) {
	  uploadAvatar(req.file.path, function(response){
	    if (response.error) {
		  console.log('Error: cloudinary error', response.error)
		  return res.status(400).send({
	  		error: true,
	  		message: 'Error creating new user, kindly try again'
		  });
	    }

		var newUser = new User({
		  username: req.body.username,
		  avatar: response.url
	    });
		newUser.save(function(err, user) {
		  if (err) {
			  console.log('Error: user create error', err)
    		  return res.status(400).send({
    	  		error: true,
    	  		message: 'Error creating new user, kindly try again'
			  });
		  }
		  return res.status(201).send({
		    error: false,
			message: 'New user created',
			user: user
		  });
	    });
	  });
    } else {
	  var newUser = new User({
		username: req.body.username,
		avatar: defaultAvatar
	  });

	  newUser.save(function(err, user) {
		if (err) {
	      console.log('Error: user create error', err)
	      return res.status(400).send({
		    error: true,
			message: 'Error creating new user, kindly try again'
		  })
		}
		return res.status(201).send({
		  error: false,
		  message: 'New user created',
		  user: user
	    });
	  });
    }
  },

  createPost: function(req, res) {
	var newPost = new Post({
	  user: req.body.user,
	  text: req.body.text,
    dateCreated: Date.now()
    });
	newPost.save(function(err, post) {
	  if (err) {
		console.log('Error: post create error', err)
		return res.status(400).send({
	      error: true,
		  message: 'Error creating new post, kindly try again'
		});
	  }
	  return res.status(201).send({
		error: false,
		message: 'New post created',
		post: post
	  });
	});
  },

  getPosts: function(req, res) {
	Post.find({})
	  .populate('user')
    .sort({'dateCreated': -1})
	  .exec(function(err, posts) {
	    if (err) {
		  console.log('Error: posts fetch error', err)
  		  return res.status(400).send({
  		    error: true,
  		    message: 'Error fetching posts, kindly try again'
  		  });
	    }
	    return res.status(200).send({
 	      error: false,
 	      message: 'Found posts',
 	      posts: posts
 	    });
	})
  }
}
