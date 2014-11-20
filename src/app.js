'use strict';

var Vue = require('vue');

module.exports = new Vue({
  el: '#main',
  components: {
    modal: require('./modal')
  }
});
