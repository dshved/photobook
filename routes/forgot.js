var express = require('express'),
  router = express.Router(),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport');

var User = require('../models/user').User;

router.get('/', function (req, res, next) {
    res.render('common/_forget');
});

router.post('/', function (req, res, next) {
  var email = req.body.email;

  if (email) {
    User.findOne( { email: email }, function (err, user) {
      if (err) return next(err);

      if (user) {
        var transport = nodemailer.createTransport(
          smtpTransport({
            service: 'gmail',
            auth: {
              user: 'loftalbum@gmail.com',
              pass: 'denys5dev'
            }
          })
        );

        var symbols = [];
        for(var i = 0; i < 10; i++) {
          symbols[i] = String(i);
        };
        for(var i = 97; i < 123; i++) {
          symbols.push(String.fromCharCode(i));
        };
        var newPassword = '';
        for(var i = 0; i <= 8; i++) {
          newPassword += symbols[Math.round(Math.random() * symbols.length)];
        };
        user.set('password', newPassword);
        user.save();

        var params = {
          from: 'loftalbum@gmail.com', 
          to: email, 
          subject: 'Восстановление пароля', 
          text: 'Ваш новый пароль: ' + newPassword 
        };
        
        transport.sendMail(params, function(error, info){
          if(error){
              return console.log(error);
          }
        });
        res.end()
      } else {
        res.status(400);
        res.write('Нет пользователя с таким email');
        res.end();
      }
    })
  } 
});

module.exports = router;