var $ = require('jquery');

$('#try-it-btn').on('click', function (event) {
  event.preventDefault();
  $('header.hero').addClass('try-it');
});