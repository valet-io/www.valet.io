'use strict';

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var plugins    = require('gulp-load-plugins')();
var connect    = require('connect');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var http       = require('http');
var open       = require('open');

plugins.grunt(gulp);

gulp.task('styles', function () {
  return gulp.src('styles/main.scss')
    .pipe(plugins.sass({
      includePaths: require('node-bourbon').includePaths,
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('images', function () {
  return gulp.src(['images/**/*'])
    .pipe(gulp.dest('build/images'));
});

gulp.task('bundle', function () {
  return browserify()
    .add('./src/index.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('server', function (done) {
  var server = http.createServer(connect()
    .use(require('connect-livereload')())
    .use(connect.static('build'))
  )
  .listen(8000, function () {
    gutil.log('Running on http://localhost:' + server.address().port);
    done();
  });
});

gulp.task('build', ['grunt-assemble', 'styles', 'images', 'bundle']);

gulp.task('serve', ['build', 'server'], function () {
  var livereload = plugins.livereload();
  plugins.livereload.listen();
  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch('images/**/*', ['images']);
  gulp.watch('src/*.js', ['bundle']);
  gulp.watch(['layouts/*', 'pages/**/*', 'partials/**/*'], ['grunt-assemble']);

  gulp.watch('build/**/*').on('change', function (file) {
    livereload.changed(file.path);
  });
});
