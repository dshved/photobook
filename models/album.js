var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
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
var Album = mongoose.model('Album', albumSchema);

module.exports = {
  Album: Album
};