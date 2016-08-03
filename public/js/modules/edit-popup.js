'use strict';
var Handlebars = require('handlebars');
// var $ =  require('jquery');

function init() {
  _setUpListners();
};

function _setUpListners() {
  $('#edit').on('click', _showModal);

  $('.modal__window_popup').on('click','#btn_close_modal', _closeModal);
  $('.modal__window_popup').on('click','#btn_cancel_modal', _closeModal);

  $('.modal__window_popup').on('change', '#upload_ava' ,  _previewFileAuthor);
  $('.modal__window_popup').on('change', '#upload_bg' ,  _previewFileBg);

  $('.modal__window_popup').on('submit','#popup__user_edit', subform);
};

var subform = function(e) {
  e.preventDefault();
  var form = $('#popup__user_edit');

 $(form).ajaxSubmit({
    error: function(xhr) {
      console.log(xhr);
    },
    success: function(response) {
    console.log(response);
    }
  });
   $('.modal__window_popup').addClass('close').empty();
};


var _closeModal = function(e) {
  e.preventDefault();

  $('.modal__window_popup').addClass('close').empty();

};


var _showTemplate = function(path) {
  var d = $.Deferred(),
    template;

  $.ajax({
    url: path,
    success: function(data) {
      template = Handlebars.compile(data);
      d.resolve(template);
    }
  });

  return d.promise();
};


var _showModal = function(e) {
  e.preventDefault();
  $('.modal__window_popup').removeClass('close');
  var deff = _showTemplate('templates/edit-popup.hbs');
  deff.then(function(template) {
    $('.modal__window_popup').html(template({
      user_name: $('.author__name').text(),
      user_about: $('.author__about').text(),
      user_ava: $('.author__photo').attr('src')
    }));
  });
};

var _previewFileAuthor = function () {
  var preview = $('.modal__img-author')[0];
  var file    = $("#upload_ava")[0].files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
};

var _previewFileBg = function () {
  var preview = $('.modal__img-bg')[0];
  var file    = $("#upload_bg")[0].files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
};


module.exports = {
  init: init
};