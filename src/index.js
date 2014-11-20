'use strict';

var $   = require('jquery');
var Vue = require('vue');

var $overlay = $('.modal-overlay');
var $modal = $('.modal');
var $form = $('#demo-request-modal form');
var $fields = {
  name: $('#demo-request-name'),
  organization: $('#demo-request-organization'),
  email: $('#demo-request-email')
};

var app = require('./app');

// $('.start-demo-request').on('click', function (event) {
//   event.preventDefault();
//   $overlay.show();
//   $modal.show();
// });

// $('.modal-close').on('click', function () {
//   $overlay.hide();
//   $modal.hide();
// });

// $form.on('submit', function (event) {
//   event.preventDefault();
//   var data = {};
//   for (var field in $fields) {
//     data[field] = $fields[field].val();
//   }
//   $.post('http://site-api.valet.io/leads', data)
//     .done(function () {
//       $form.append('Thanks! We received your request and will be in touch soon.');
//       setTimeout(function () {
//         $form.hide();
//         $modal.hide();
//       }, 500);
//     })
//     .fail(function () {
//       $form.append('Oh no! We were not able to submit your request. You can try again or <a href="mailto:jordan@valet.io">email us directly</a>.');
//     });
// });
