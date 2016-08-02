var express = require('express');
var router = express.Router();

var User = require('../models/user').User;

function requireLogin(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/');
    res.end();
  } else {
    next();
  }
};


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main', requireLogin, function(req, res, next) {

  User.findOne({_id: req.session.user_id}, function (err, user) {
    if (err) return next(err);
    res.render('common/_main_page', {
      name: user.name,
      description: user.description || 'Заполните описание...',
      ava: user.avatar || '/img/default_avatar.jpg'
    });
    res.end();
  });
});


router.get('/logout', function(req, res) {
  req.session.destroy();
  res.send('ok');
});

module.exports = router;
