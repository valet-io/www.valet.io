'use strict';

var Vue = require('vue');

module.exports = new Vue({
  el: '#main',
  components: {
    'bd-modal': require('./modal')
  }
});
