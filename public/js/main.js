// var $ =  require('jquery');

var auth = require('./modules/auth.js');
auth.init();

var flip = require('./modules/flip.js');
flip.init();

var editPupup = require('./modules/edit-popup.js');
editPupup.init();

var addAlbum = require('./modules/album-popup.js')
addAlbum.init();
