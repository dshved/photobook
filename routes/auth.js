var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/auth', function (req, res, next) {
  var email = req.body.email,
    password = req.body.password;

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  if (token) {
    jwt.verify(token, 'abcdef', function(err, decoded) {      
      if (err) {
        return next(err);    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    User.findOne( { email: email }, function (err, user) {
      if (err) return next(err);
      
      if (!(user && user.checkPassword(password))) {
        res.status(400);
        res.write('email или пароль неверен');
        res.end();
      } else {
        token = jwt.sign(user, 'abcdef', {
          expiresIn: 60*60*24*7
        });
        res.status(200);
        res.send(token);
        res.end();
      }
    })
  };
});


  

