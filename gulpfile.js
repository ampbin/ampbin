/* ampbin gulpfile */
const gulp             = require('gulp');
const del              = require('del');
const rev              = require('gulp-rev');
const sass             = require('gulp-sass');
const babel            = require('gulp-babel');
const serve            = require('gulp-serve');
const concat           = require('gulp-concat');
const minify           = require('gulp-minify');
const inject           = require('gulp-inject');
const csscomb          = require('gulp-csscomb');
const webpack          = require('gulp-webpack');
const cleancss         = require('gulp-clean-css');
const sourcemaps       = require('gulp-sourcemaps');
const autoprefixer     = require('gulp-autoprefixer');


/* SCRIPTS */
/* ------- */

/* Remove existing files */
gulp.task('scripts:clean', () => {
  return del(['./build/webpack/*.js', './public/assets/js/*.js']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

/* Convert ES6 to ES5 */
gulp.task('scripts:transpile', ['scripts:clean'], () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({presets: 'es2015'}))
    .pipe(gulp.dest('./build/transpile'))
    ;
});

/* Combine the files into one */
gulp.task('scripts:webpack', ['scripts:clean', 'scripts:transpile'], () => {
  return gulp.src('./build/transpile/*.js')
    .pipe(webpack({
      output: {
        filename: 'ampbin.js'
      }
    }))
    .pipe(gulp.dest('./build/webpack'))
    ;
});

/* Minify the single JS file */
gulp.task('scripts:minify', ['scripts:clean', 'scripts:transpile', 'scripts:webpack'], () => {
  return gulp.src('./build/webpack/ampbin.js')
    .pipe(minify({
      ext: { min: '.min.js' }
    }))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    ;
});

/* STYLES */
/* ------ */

gulp.task('styles:clean', () => {
  return del(['./public/assets/css/*.css', './public/assets/maps/*.map']).then(paths => {
    console.log('Deleted CSS files and folders:\n', paths.join('\n'));
  });
});

/* Compile the SCSS, make it pretty, and add vendor prefixes */
gulp.task('styles:compile', ['styles:clean'], () => {
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

/* Minify the stylesheet */
gulp.task('styles:minify', ['styles:compile'], () => {
  return gulp.src('./public/assets/css/ampbin.css')
    .pipe(sourcemaps.init())
    .pipe(cleancss())
    .pipe(concat('ampbin.min.css'))
    .pipe(rev())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./public/assets/css'))
    ;
});

/* SERVE */
/* ----- */
gulp.task('serve', serve('public'));

/* INJECT */
/* ------ */
gulp.task('inject', ['scripts:minify', 'styles:minify'], function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src([
    './public/assets/css/*.min.css', 
    './public/assets/js/*.min.js'], 
    {read: false}
  );

  return target.pipe(inject(sources, {ignorePath: 'public'}))
    .pipe(gulp.dest('./public'));
});

/* WATCH */
/* ----- */

/* Watch the scripts */
gulp.task('scripts:watch', () => {
  gulp.watch('./src/js/*.js', ['scripts:transpile', 'scripts:minify', 'inject']);
});

/* Watch the styles */
gulp.task('styles:watch', () => {
  gulp.watch('./src/scss/*.scss', ['styles:compile', 'styles:minify', 'inject']);
});

/* Watch everything */
gulp.task('watch', ['serve', 'scripts:minify', 'styles:minify', 'inject'], () => {
  gulp.watch('./src/js/*.js', ['scripts:transpile', 'scripts:minify', 'inject']);
  gulp.watch('./src/scss/*.scss', ['styles:compile', 'styles:minify', 'inject']);
});
