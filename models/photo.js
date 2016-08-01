var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var photoSchema = new Schema({
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



mongoose.model('Photo', photoSchema);

