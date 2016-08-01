var express = require('express'),
  multiparty = require('multiparty'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/', router);
};

//Редактирование профиля
router.post('/profile', function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
   
  if (token) {
    jwt.verify(token, 'abcdef', function(err, decoded) {
        
      if (err) {
        return next(err);    
      } else {

        User.findOne({email: decoded._doc.email}, function (err, user) {
          if (err) return next(err);

          var form = new multiparty.Form();

          form.parse(req, function(err, fields, files) {

            var description = fields.description[0],
              name = fields.name[0];
              avatar = files.file[0].path;

            if (name) user.name = name;
            user.description = description;
            user.avatar = avatar;

            user.save();

            res.end();
          });
        });
      };
    });   
  }
})