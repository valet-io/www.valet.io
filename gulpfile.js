'use strict';

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var plugins    = require('gulp-load-plugins')();
var nodeStatic = require('node-static');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var http       = require('http');
var open       = require('open');

plugins.grunt(gulp);

gulp.task('styles', function () {
  return gulp.src('styles/main.scss')
    .pipe(plugins.sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('images', function () {
  return gulp.src(['images/**/*'])
    .pipe(gulp.dest('build/images'));
});

gulp.task('js', function () {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('server', function (done) {
  var server = new nodeStatic.Server('./build');
  http.createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    })
    .resume();
  })
  .listen(8000, function() {
    gutil.log('Server listening on port: ' + gutil.colors.magenta(8000));
    open('http://localhost:8000');
    done();
  });
});

gulp.task('build', ['grunt-assemble', 'styles', 'images', 'js']);

gulp.task('serve', ['build', 'server'], function () {
  var livereload = plugins.livereload();
  gulp.watch('styles/**/*.styl', ['styles']);
  gulp.watch('images/**/*', ['images']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch(['layouts/*', 'pages/**/*', 'partials/*'], ['grunt-assemble']);

  gulp.watch('build/**/*').on('change', function (file) {
    livereload.changed(file.path);
  });
});
