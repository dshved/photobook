var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(sass.sync().on('error', sass.logError))

  .pipe(gulp.dest('./public/css'));
});


gulp.task('js', function() {
  gulp.src('./public/js/main.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./public/js/'))
});


gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
