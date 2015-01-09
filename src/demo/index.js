'use strict';

var Vue = require('vue');
var xhr = require('xhr');

module.exports = Vue.extend({
  template: require('./demo.html'),
  data: function () {
    return {
      submission: {
        attempted: false,
        succeeded: false
      },
      request: {}
    };
  },
  methods: {
    send: function (event) {
      event.preventDefault();
      var self = this;
      xhr({
        uri: 'http://site-api.valet.io/leads',
        method: 'POST',
        json: this.request,
        timeout: 5000
      }, function (err, response, body) {
        self.submission.attempted = true;
        if (err || response.statusCode >= 400) {
          self.submission.succeeded = false;
        }
        else {
          self.submission.succeeded = true;
        }
      });
    }
  },
  ready: function () {
    this.$watch('submission.succeeded', function (value) {
      if (value) {
        var self = this;
        setTimeout(function () {
          self.$root.demoModal.hide();
        }, 1500);
      }
    })
  }
});
