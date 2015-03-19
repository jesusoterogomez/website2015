

// Gulp modules
var gulp    = require('gulp'),
    sass    = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass'),
    path    = require('path'),
    open    = require('gulp-open'),
    clean   = require('gulp-clean');

// Directories
var dir_build = 'build/',
    dir_dist  = 'dist/';

// Build tasks
gulp.task('build', ['html', 'compass', 'media', 'watch']);
gulp.task('build:dist', ['html:dist', 'styles:dist', 'watch']);

// Watch task
gulp.task('watch', function() {
  gulp.watch('scss/**/*', ['compass'])
  gulp.watch('*.html', ['html'])
  gulp.watch('/media/**', ['media'])
});

// Compass Task
gulp.task('compass', function() {
  return gulp.src('scss/**/*')
    .pipe(compass({
      css: 'css',
      sass: 'scss'
    }))
    .on('error', logError)
    .pipe(gulp.dest(dir_build+'/css'))
    .pipe(connect.reload());
});


// Build html
gulp.task('html', function() {
  return gulp.src('*.html')
  .pipe(gulp.dest(dir_build))
  .pipe(connect.reload());

});

// Media
gulp.task('media', function(){
  return gulp.src('media/**')
  .pipe(gulp.dest(dir_build + '/media'));
});

// Open a web browser window
gulp.task('open:www', ['connect'], function() {
  //
  return gulp.src(dir_build + '/index.html')
  .pipe(open('', {
    url:"http://localhost:8080"
  }));
});

// Start a web server
gulp.task('connect', ['build'], function() {
  return connect.server({
    root: dir_build,
    livereload: true,
  });
});

function logError (error) {
    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

gulp.task('serve', ['open:www']);

gulp.task('clean', function() {
  gulp.src(dir_dist,  {read: false})
  .pipe(clean({force:true}))
  gulp.src(dir_build, {read: false})
  .pipe(clean({force:true}))
  gulp.src('.sass-cache', {read: false})
  .pipe(clean({force:true}))
});