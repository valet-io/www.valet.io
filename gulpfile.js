'use strict';

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var plugins    = require('gulp-load-plugins')();
var nodeStatic = require('node-static');
var http       = require('http');

plugins.grunt(gulp);

gulp.task('styles', function () {
  return gulp.src('styles/main.styl')
    .pipe(plugins.stylus({
      use: ['nib'],
      import: ['nib']
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('server', function(done) {
  var server = new nodeStatic.Server('./build');
  http.createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(8000, function() {
    gutil.log('Server listening on port: ' + gutil.colors.magenta(8000));
    done();
  });
});

gulp.task('watch', ['server'], function () {
  var livereload = plugins.livereload();
  gulp.watch('styles/*.styl', ['styles']);
  gulp.watch(['layouts/*', 'pages/**/*', 'partials/*'], ['grunt-assemble']);

  gulp.watch('build/**/*').on('change', function (file) {
    livereload.changed(file.path);
  });
});