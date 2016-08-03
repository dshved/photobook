var express = require('express'),
  router = express.Router();

var User = require('../models/user').User;

router.post('/', function (req, res, next) {

  var name = req.body.name,
    email = req.body.email,
    password = req.body.password;

  if ( !(name && email && password) ) {
    res.status(400);
    res.write('Не все обязательные поля заполнены');
    res.end();
    return;
  }

  User.findOne( { email: email }, function (err, user) {
    if (err) return next(err);
    
    if (!user) {
      var newUser = new User({
        name: name,
        email: email,
        password: String(password) 
      })
      newUser.save(function (err) {
        if (err) {
          res.status(500);
          res.write('Нельзя создать пользователя с таким именем');
          res.end();
          return;
        }
          
        console.log('Пользователь добавлен в базу данных');
        console.log(newUser);
        res.status(200);
        res.write('Успешная регистрация');
        res.end();
      })
    } else {
      res.status(400);
      res.write('Пользователь с таким адресом электронной почты уже есть');
      res.end();
    }
    
  })
});

module.exports = router;