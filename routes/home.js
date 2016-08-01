var express = require('express'),
  multiparty = require('multiparty'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  Album = mongoose.model('Album');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/main', function (req, res, next) {
    res.render('common/_main_page');
});

// router.get('/main', function (req, res, next) {

//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
//   //если токен есть, расшифровываем, выделяем свойство email, находим пользователя с 
//   //таким email и рендерим его личную страницу 
//   console.log(token);
//   if (token) {
//     jwt.verify(token, 'abcdef', function(err, decoded) {
        
//       if (err) {
//         console.log(err);
//         return next(err);    
//       } else {
        
//         User.findOne({email: decoded._doc.email}, function (err, user) {
//         console.log(decoded._doc.email);
//           if (err) return next(err);
//           res.render('common/_main_page', {
//             name: user.name,
//             description: user.description || 'Заполните описание...',
//             avatar: user.avatar
//           });
//           res.end();
//         }
        
//         )};
//     });   
//   //если токена нет, возвращаемся на страницу авторизации
//   } else {
//     res.render('index');
//   }
// });