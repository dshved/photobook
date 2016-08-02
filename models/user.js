var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  avatar: {
    type: String
  }
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}
userSchema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
}

userSchema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function(){
    return this._plainPassword;
  });

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};