'use strict';

var Vue = require('vue');

module.exports = Vue.extend({
  paramAttributes: ['title'],
  template: require('./modal.html'),
  data: function () {
    return {
      visible: false
    };
  },
  methods: {
    show: function () {
      this.visible = true;
    },
    hide: function () {
      this.visible = false;
    },
    toggle: function () {
      this.visible = !this.visible;
    }
  },
  created: function () {
    this.$modal = {};
  },
  compiled: function () {
    var name = this.$el.getAttribute('name');
    if (name) {
      this.$modal.name = name;
      this.$root.$set(name, this);
    }
  },
  destroyed: function () {
    if (this.$modal.name) {
      this.$root.$set(this.$modal.name, void 0);
    }
  }
});
