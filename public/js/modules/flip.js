'use strict';
var $ =  require('jquery');

function init() {
  _setUpListners();
};

function _setUpListners() {
  $('#auth-btn').on('click', _formFlip);
  $('#signin-btn').on('click', _formFlip);
};

var _formFlip = function(e) {
  e.preventDefault();
  var flip = $('.flip');
  flip.toggleClass('flipping');
};

module.exports = {
  init: init
};