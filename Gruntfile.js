'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
    assemble: {
      options: {
        assets: 'build/assets',
        layoutdir: 'layouts',
        layoutext: '.hbs',
        layout: 'default',
        helpers: ['handlebars-helper-partial']
      },
      pages: {
        options: {
          data: 'pages/data.json',
          partials: ['partials/*.hbs']
        },
        expand: true,
        cwd: 'pages/',
        src: ['**/*.hbs'],
        dest: 'build/'
      }
    }
  });
};