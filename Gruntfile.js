'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
    assemble: {
      options: {
        assets: 'build/assets',
        layoutdir: 'layouts',
        layoutext: '.hbs',
        layout: 'default'
      },
      pages: {
        options: {
          data: 'pages/data.json'
        },
        expand: true,
        cwd: 'pages/',
        src: ['**/*.hbs'],
        dest: 'build/'
      }
    }
  });
};