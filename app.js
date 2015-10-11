var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var index = require('./routes/index');
var app = express();
var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/ToDo";
var MongoDB = mongoose.connect(mongoURI).connection;
var bodyParser= require('body-parser');


app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

MongoDB.on('error', function (err){
  console.log('mongodb connection error:', err);
});

MongoDB.once('open', function(){
  console.log('mongodb connection open!');
});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
