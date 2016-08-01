var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var albumSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  title: {
  	type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
 cover: {
    type: String,
    required: true
  },
});

mongoose.model('Album', albumSchema);

