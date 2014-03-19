'use strict';

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('styles/main.styl')
    .pipe(plugins.stylus({
      use: ['nib'],
      import: ['nib']
    }))
    .pipe(gulp.dest('./build/css'));
});