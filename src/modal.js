'use strict';

var Vue = require('vue');

module.exports = Vue.extend({
  created: function () {
    this.modal = {};
  },
  compiled: function () {
    var name = this.$el.getAttribute('name');
    if (name) {
      this.modal.name = name;
      this.$parent.$set(name, this);
    }
  },
  destroyed: function () {
    if (this.modal.name) {
      this.$parent.$set(this.modal.name, void 0);
    }
  },
  template: '<div v-show="visible"><content></content></div>',
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
  }
});
