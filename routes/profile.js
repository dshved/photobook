var express = require('express'),
  util = require('util'),
  multiparty = require('multiparty'),
  fs = require('fs'),
  router = express.Router();
var $ = require('jquery');

var User = require('../models/user').User;

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}


function requireLogin(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/');
    res.end();
  } else {
    next();
  }
};

router.post('/', function(req, res, next) {

  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    User.findOne({ _id: req.session.user_id }, function(err, user) {
      if (err) return next(err);
      var description = fields.user_about[0],
        name = fields.user_name[0];
      old_ava = user.avatar;
      if (!isEmptyObject(files)) {

        var ava = files.upload_ava;
        var bg = files.upload_bg;
        if (ava) {
          fs.readFile(ava[0].path, function(err, data) {
            var radom = Math.random().toString(36);
            var randomName = radom.substring(2, radom.length);
            var path = './public/upload/' + randomName + '-' + ava[0].originalFilename;
            fs.writeFile(path, data, function(err) {
              if (name) user.name = name;
              user.description = description;
              user.avatar = '/upload/' + randomName + '-' + ava[0].originalFilename;
              user.save();
              fs.unlink('./public/' + old_ava, function(err) {
                if (err) throw err;
                console.log("file deleted");
              });
            });

          });


        } else {
          console.log('нет');
          res.end();
        }
      } else {
        console.log('false');
        res.send('нет файла');
        res.end();

      }

      res.send();
      res.end();

    });
  });
});


module.exports = router;
