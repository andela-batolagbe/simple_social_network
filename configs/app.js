'use strict';

var express = require('express');
var mongoose = require('mongoose')
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoStore = require('connect-mongo')(session);
var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// load environment configurations
var config = require('./config');
var routes = require('../server/routes');

var app = express();
var router = express.Router();

routes(router);

app.use('/static', express.static(path.join(__dirname, '/../client/')));

// parse body contents as a JSON objects
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());

// manage app API request sessions.
app.use(session({
  secret: config.secret,
  store: new mongoStore({
    mongooseConnection: mongoose.connection,
  }),
  saveUninitialized: true,
  resave: false
}));

// Allow cross origin requests
app.use(function(err, req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token');

  if (err) {
    console.log('Express error', err);
    return res.status(400)
      .send({
        error: true,
        message: 'App encountered error. kindly try again'
      });
  }
  next();
});

/* SERVER CONFIGS */
/* override with the X-HTTP-Method-Override
header in the request. simulate DELETE/PUT
*/
app.use(methodOverride('X-HTTP-Method-Override'));

// route server endpoints through api
app.use('/api/', router);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});


module.exports = app;
