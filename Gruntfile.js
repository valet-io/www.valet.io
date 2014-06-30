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
        helpers: ['handlebars-helper-partial'],
        plugins: ['assemble-contrib-permalinks']
      },
      pages: {
        options: {
          data: 'pages/data.json',
          partials: ['partials/**/*.hbs'],
          permalinks: {
            preset: 'pretty'
          }
        },
        files: [{
          expand: true,
          cwd: 'pages/',
          src: ['**/*.hbs'],
          dest: 'build/',
          ext: '.html'
        }]
      }
    }
  });
};
