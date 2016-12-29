'use strict';

//load environment variables using dotenv
require('dotenv').config();

// import server configurations
var db = require('./configs/db');
var app = require('./configs/app');

// run app on environment declared port or 5000
var port = process.env.PORT || 5000;

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = app;
