// var $ =  require('jquery');

var auth = require('./modules/auth.js');
auth.init();

var flip = require('./modules/flip.js');
flip.init();

var editPupup = require('./modules/edit-popup.js');
editPupup.init();

var addAlbum = require('./modules/album-popup.js')
addAlbum.init();

var promise = new Promise(function (resolve,reject) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "work.json", true);
  xhr.onloadend = function() {

  if (xhr.status >= 400) {
    alert("соединение не установлено")
  } else {
    resolve(xhr.responseText);
    }
  };

  xhr.send();
});

promise.then(function(xhr){
  function supportsTemplate() {
    return 'content' in document.createElement('template');
  }

  if (supportsTemplate()) {
    var t = document.querySelector('#mytemplate'); // сам шаблон
    var templateBody = document.querySelector('#template'); // куда вставляем
    var json = JSON.parse(xhr).photo; // парсим JSON пришедший из Промиса

    json.forEach(function (item) {
      t.content.querySelector('.photo__image').src = item.url; // вставка главного изображения
      t.content.querySelector('.photo__avatar').src = item.avatar; // вставка аватара
      t.content.querySelector('.photo__content-text').innerText = item.photoText; // вставка описания
      t.content.querySelector('.photo__content-comments').innerText = item.comments; // вставка комментариев
      t.content.querySelector('.photo__content-like').innerText = item.like; // вставка лайков
      t.content.querySelector('.photo__name-album').innerText = item.photoName; // вставка текста подвала

      templateBody.appendChild(t.content.cloneNode(true));
    });
  } else {
  // для старого подхода
  }
}, function () {
  alert("json not found");
});