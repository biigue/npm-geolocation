const gulp = require('gulp');
const concat = require('gulp-concat');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');

gulp.task('default', function () {
    return gulp.src('./src/geolocation.js')
        .pipe(concat('geolocation.js'))
        .pipe(jsmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));
});