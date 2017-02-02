"use strict"

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  del = require('del'),
  maps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),
  image = require('gulp-imagemin');

 

gulp.task('clean', function(){
  return del(['dist']);
});

gulp.task('scripts', scripts);

gulp.task('styles', styles);

gulp.task('images', images);

gulp.task('build', ['clean', 'styles', 'scripts', 'images']);

function styles(){
  return gulp.src('sass/global.scss')
      .pipe(maps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename('all.min.css'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/styles'));
} 

function scripts(){
  return gulp.src([
        'js/**/*.js',
        'js/*.js'
      ])
    .pipe(maps.init())
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
}
  
function images(){
  return gulp.src('images/*.*')
    .pipe(image())
    .pipe(gulp.dest('dist/content'));
}

