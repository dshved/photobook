var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  album: {
  	type: String,
  	required: true
  },
  file: {
  	type: String,
  	required: true,
  	unique: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: {
      author: {
        type: String
      },
      comment: {
        type: String
      }
    },
    value: Number,
    default: 0
  } 
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = {
  Photo: Photo
};