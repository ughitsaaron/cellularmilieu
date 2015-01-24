"use strict";

// dependencies
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');
 
// compile paths
var paths = {
  markup: { src:['./**/*.html','!./**/*'] },
  styles: { src:'./scss', files:'./scss/main.scss', dest:'./css' },
  scripts: { src: './js/main.js', dest:'./js', ext:'main.min.js'}
};
 
var watchPaths = [paths.markup.src, paths.styles.src, paths.scripts.src];
 
// function for error handling
var onError = function(err) {  
  gutil.beep();
  console.log(err);
};
 
// stylesheets
gulp.task('styles', function() {
  return sass(paths.styles.files, {
    style: "compressed",
    noCache:true,
    loadPath: [
      "scss/components/bourbon/app/assets/stylesheets/",
      "scss/components/neat/app/assets/stylesheets/",
      "scss/components/normalize.css/"
    ]
  })
  .pipe(plumber({errorHandler: onError}))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(livereload());
});
 
// scripts
gulp.task('scripts', function() {
  gulp.src(paths.scripts.src)
  .pipe(plumber({errorHandler: onError}))
  .pipe(uglify(paths.scripts.src))
  .pipe(rename(paths.scripts.ext))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(livereload());
});
 
// watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.styles.files, ['styles']);
  gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch(watchPaths).on('change', livereload.changed);
});
 
// default task
gulp.task('default', ['watch','styles','scripts']);