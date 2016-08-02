var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken');

var User = require('../models/user').User;


function loadUser(req, res, next) {
  if (req.session.user_id) {
    User.findById(req.session.user_id, function(user) {
      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.redirect('./main');
      }
    });
  } else {
    res.redirect('./');
  }
};

router.post('/', function (req, res, next) {
  var email = req.body.email,
    password = req.body.password;

    User.findOne( { email: email }, function (err, user) {
      if (err) return next(err);
      
      if (!(user && user.checkPassword(password))) {
        res.status(400);
        res.write('email или пароль неверен');
        res.end();
      } else {
        req.session.user_id = user._id;
        res.send();
        res.end();
      }
    })
});

module.exports = router;