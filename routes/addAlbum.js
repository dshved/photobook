var express = require('express'),
  util = require('util'),
  multiparty = require('multiparty'),
  fs = require('fs'),
  router = express.Router();

var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;


router.post('/', function(req, res, next) {
  var description,
    title,
    filePath,
    user_id = req.session.user_id;

  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {

    description = fields.album_description[0];
    title = fields.album_name[0];
    filePath = files.upload_bg[0].path;

    fs.readFile(filePath, function(err, data) {
      var radom = Math.random().toString(36);
      var randomName = radom.substring(2, radom.length);
      var path = './public/upload/' + randomName + '-' + files.upload_bg[0].originalFilename;
      fs.writeFile(path, data, function(err) {
        Album.find({}, function(err, albums) {
          if (err) return next(err);

          var newAlbum = new Album({
            owner: user_id,
            title: title,
            description: description,
            cover: path
          });
          newAlbum.save();
          res.redirect('/main');
          res.end();
        });
      });

    });




  });
});

module.exports = router;
