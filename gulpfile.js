/* ampbin gulpfile */
const gulp             = require('gulp');
const sass             = require('gulp-sass');
const babel            = require('gulp-babel');
const concat           = require('gulp-concat');
const minify           = require('gulp-minify');
const csscomb          = require('gulp-csscomb');
const cleancss         = require('gulp-clean-css');
const sourcemaps       = require('gulp-sourcemaps');
const autoprefixer     = require('gulp-autoprefixer');

/* scripts */
gulp.task('scripts:transpile', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({presets: 'es2015'}))
    .pipe(concat('ampbin.js'))
    .pipe(gulp.dest('./public/assets/js'))
    ;
});

gulp.task('scripts:minify', ['scripts:transpile'], () => {
  return gulp.src('./public/assets/js/ampbin.js')
    .pipe(minify({
      ext: { min: '.min.js' }
    }))
    .pipe(gulp.dest('./public/assets/js'))
    ;
});

/* scss/css */
gulp.task('styles:compile', () => {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass()
      .on('error', sass.logError)
    )
    .pipe(csscomb())
    .pipe(autoprefixer({
      browsers: 'last 4 version',
      cascade: false
    }))
    .pipe(concat('ampbin.css'))
    .pipe(gulp.dest('./public/assets/css'))
    ;
});

gulp.task('styles:minify', ['styles:compile'], () => {
  return gulp.src('./public/assets/css/ampbin.css')
    .pipe(sourcemaps.init())
    .pipe(cleancss())
    .pipe(sourcemaps.write())
    .pipe(concat('ampbin.min.css'))
    .pipe(gulp.dest('./public/assets/css'))
    ;
});

/* watch */
gulp.task('scripts:watch', () => {
  gulp.watch('./src/js/*.js', ['scripts:transpile', 'scripts:minify']);
});

gulp.task('styles:watch', () => {
  gulp.watch('./src/scss/*.scss', ['styles:compile', 'styles:minify']);
});

gulp.task('watch', () => {
  gulp.watch('./src/js/*.js', ['scripts:transpile', 'scripts:minify']);
  gulp.watch('./src/scss/*.scss', ['styles:compile', 'styles:minify']);
});
