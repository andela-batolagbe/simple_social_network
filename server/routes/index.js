'use strict';

var multer = require('multer')
var controller = require('../controllers')

//multer properties for saving into file with an assigned name.
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './temp/');
  },
  filename: function(req, file, cb) {
	var date = new Date()
   console.log('FILLLEE USERNAME', req.body.username)
    cb(null, req.body.username + '-' + date);
  }
});

var upload = multer({
  storage: storage
}).single('avatar')

module.exports = function(router) {
  router.route('/createUser')
    .post(upload, controller.createUser)
  router.route('/createPost')
    .post(controller.createPost)
  router.route('/getPosts')
    .get(controller.getPosts)
}
