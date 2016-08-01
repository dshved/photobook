var express = require('express'),
  multiparty = require('multiparty'),
  jwt = require('jsonwebtoken'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Album = mongoose.model('Album'),
  Photo = mongoose.model('Photo');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/addAlbum', function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
   
  if (token) {
    jwt.verify(token, 'abcdef', function(err, decoded) {
        
      if (err) {
        return next(err);    
      } else {

        var description,
          title,
          filePath,
          email = decoded._doc.email

        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {

          description = fields.description[0];
          title = fields.title[0];
          filePath = files.photo[0].path;

        });
        
        Album.find({}, function (err, albums) {
          if (err) return next(err);

          var newAlbum = new Album({
            owner: email,
            title: title,
            description: description,
            cover: filePath
          });
          newAlbum.save(function(err) {
            if (err) {
              console.log(err);
            } 
          });
          res.end();
        });
      };
    });   
  }
}) 

