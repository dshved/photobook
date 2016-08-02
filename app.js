var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photobook');

var routes = require('./routes/index');
var users = require('./routes/users');
var forgot = require('./routes/forgot');
var registration = require('./routes/registration');
var auth = require('./routes/auth');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'asdfasdfDFSDSD67sdfksD332s',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ url: 'mongodb://localhost/photobook' })
}));

app.use(require('node-sass-middleware')({
  src: __dirname + '/scss',
  dest: __dirname + '/public/css',
  indentedSyntax: false,
  debug: true,
  sourceMap: true,
  prefix: '/css'
}));

// browserify.settings.development('basedir', __dirname);

// app.use('/js', browserify(__dirname + '/public/js/modules'));
// app.get('/js/app.js', browserify(__dirname + '/public/js/main.js'));
// app.get('/js/app.js', browserify(['hyperquest', 'concat-stream']));
// app.get('/js/app.js', browserify(['hyperquest', 'concat-stream', {__dirname + '/public/js/main.js': {run: true}}]));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/forget', forgot);
app.use('/registration', registration);
app.use('/auth', auth);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
