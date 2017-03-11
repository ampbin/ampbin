var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');

var DEST = 'public/assets/';

gulp.task('default', function() {
	return gulp.src('ampbin.js')
		.pipe(gulp.dest(DEST))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(browserify({
		insertGlobals : true,
			debug : !gulp.env.production
		}))
		.pipe(gulp.dest(DEST));
});
