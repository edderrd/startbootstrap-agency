var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  notify = require("gulp-notify");

/**
 * All paths for each tasks for ease configuration
 * @type {Object}
 */
var paths = {
  sass: 'sass/*.scss',
  jsLibs: [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    './node_modules/jquery-easing/jquery.easing.1.3.js',
    './js/libs/*.js'
  ],
  fonts: [
    './node_modules/bootstrap-sass/fonts/*',
    './node_modules/font-awesome/fonts/*'
  ],
  images: [
    'img/*',
  ],
  serverWatch: [
    'dist/js/*.js',
    'dist/css/*.css',
    '*.html'
  ]
};

/**
 * Compile Our Sass
 */
gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass().on('error', notify.onError()))
    .pipe(gulp.dest('dist/css/'));
});

/**
 * Concatenate & Minify JS
 */
gulp.task('scripts', function() {
  // depedencies libs
  gulp.src(paths.jsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js/'));
});

/**
 * Copy Fonts
 */
gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts/'));
});

/**
 * Copy Images
 */
gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest('dist/img/'));
});

/**
 * Server for development
 */
gulp.task('server', ['sass', 'fonts', 'scripts', 'images', 'watch'], function() {
  connect.server({
    // root: 'index.html',
    livereload: true
  });
});

/**
 * Reload HTML web server
 */
gulp.task('server-reload', function() {
  gulp.src(paths.serverWatch)
    .pipe(connect.reload());
});

gulp.task('dist', function() {});

/**
 * Watch files for changes
 */
gulp.task('watch', ['images', 'fonts'], function() {
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch(paths.serverWatch, ['server-reload']);
});

/**
 * Aliases
 */
gulp.task('serve', ['server']);
gulp.task('scss', ['sass']);
gulp.task('js', ['scripts']);

// default
gulp.task('default', ['sass', 'fonts', 'scripts', 'images']);
