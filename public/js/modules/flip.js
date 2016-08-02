'use strict';
// var $ =  require('jquery');

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
  var login_form = $('#login__form');
  var reg_form = $('#registration__form');
  login_form[0].reset();
  reg_form[0].reset();
};

module.exports = {
  init: init
};