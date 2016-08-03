'use strict';
// var $ =  require('jquery');
var init = function() {
  _setUpListners();
};

function _setUpListners() {
  $('#reg_btn').on('click', _setRegistration);
  $('#login_btn').on('click', _setLogin);
  $('#forget_btn').on('click', _setForget);
  $('#logout').on('click', _setLogout);
};

var _errorMessage = function(element, message) {
  var errorBlock = '<div class="form__error"><span class="error_text">' + message + '</span></div>',
    TIMEOUT_DELAY = 1000,
    SLIDEUP_DURATION = 2000;

  element.before(errorBlock);
  element.prop('disabled', true);

  setTimeout(function() {
    $('.form__error').slideUp(SLIDEUP_DURATION, function() {
      $('.form__error').remove();
      element.prop('disabled', false);
    });
  }, TIMEOUT_DELAY)

};

var _isEmail = function(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return regex.test(email);
};

var _replaceSpace = function(value) {
  var string = value.replace(/[\s{2,}]+/g, ' ');

  if (string === '' || string === ' ') {
    return true;
  } else {
    return false;
  };

};

function _validateRegistrationForm() {
  var $this = $(this),
    form = $('#registration__form'),
    name = form.find('#registration_name'),
    email = form.find('#registration_mail'),
    password = form.find('#registration_password'),
    result = {};

  var validEmail = _isEmail(email.val());

  if (_replaceSpace(name.val()) || _replaceSpace(email.val()) || _replaceSpace(password.val())) {
    result.valid = false;
    result.message = "Вы заполнили не все поля";
    return result;
  };

  if (!validEmail) {
    result.valid = false;
    result.message = "Введите корректный Email";
    return result;
  };

  if (password.val().length < 8) {
    result.valid = false;
    result.message = "Пароль должен быть больше 8 символов";
    return result;
  };

  return true;
};

function _validateLoginForm() {
  var $this = $(this),
    form = $('#login__form'),
    email = form.find('#login_mail'),
    password = form.find('#login__password'),
    result = {};

  var validEmail = _isEmail(email.val());

  if (_replaceSpace(email.val()) || _replaceSpace(password.val())) {
    result.valid = false;
    result.message = "Вы заполнили не все поля";
    return result;
  };

  if (!validEmail) {
    result.valid = false;
    result.message = "Введите корректный Email";
    return result;
  };

  return true;
};

function _validateForgetForm() {
  var $this = $(this),
    form = $('#forget__login'),
    email = form.find('#forget_mail'),
    result = {};

  var validEmail = _isEmail(email.val());

  if (_replaceSpace(email.val())) {
    result.valid = false;
    result.message = "Вы заполнили не все поля";
    return result;
  }
  if (!validEmail) {
    result.valid = false;
    result.message = "Введите корректный Email";
    return result;
  }

  return true;
};

var _setLogin = function(e) {
  e.preventDefault();

  var $this = $(this),
    form = $('#login__form'),
    data = form.serialize(),
    result = _validateLoginForm();

  if (result === true) {
    $.ajax({
        url: '/auth',
        type: 'POST',
        dataType: 'json',
        data: data
      })
      .fail(function(data) {
        console.log(data);
        var statusCode = data.status;
        if (statusCode == 200) {
          form[0].reset();
          window.location.href = '/main';
        } else if (statusCode > 200) {
          _errorMessage($this, data.responseText);
        }
      });

  } else {
    _errorMessage($this, result['message']);
  };

};

var _setRegistration = function(e) {
  e.preventDefault();

  var $this = $(this),
    form = $('#registration__form'),
    data = form.serialize(),
    result = _validateRegistrationForm();

  if (result === true) {
    $.ajax({
        url: '/registration',
        type: 'POST',
        dataType: 'json',
        data: data
      })
      .fail(function(data) {
        var statusCode = data.status;
        if (statusCode == 200) {
          _errorMessage($this, data.responseText);
          form[0].reset();
        } else if (statusCode > 200) {
          _errorMessage($this, data.responseText);
        }
      });
  } else {
    _errorMessage($this, result['message']);
  };

};

var _setForget = function(e) {
  e.preventDefault();

  var $this = $(this),
    form = $('#forget__login'),
    data = form.serialize(),
    result = _validateForgetForm();

  if (result === true) {
    $.ajax({
        url: '/forget',
        type: 'POST',
        dataType: 'json',
        data: data
      })
      .fail(function(data) {
        var statusCode = data.status;
        if (statusCode == 200) {
          window.location.href = '/';
        } else if (statusCode > 200) {
          _errorMessage($this, data.responseText);
        }
      });

  } else {
    _errorMessage($this, result['message']);
  };

};

var _setLogout = function(e) {
  e.preventDefault();
  $.ajax({
    url: '/logout',
    type: 'GET',
  })
  .done(function(data) {
    if (data == 'ok') {
      window.location.href = '/';
    }
  });  
};

module.exports = {
  init: init
};