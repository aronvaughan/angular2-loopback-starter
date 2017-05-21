var gulp = require('gulp');
var esformatter = require('gulp-esformatter');

//for definitions of formatting node names
//http://esprima.org/demo/parse.html

/**
 * format code to match with expected eslint javascript lint checking
 */
gulp.task('prettify', function () {

    function errorAlert(err) {
        console.log(err.toString());
        this.emit("end");
    }

    /**
     * do server directories
     */
    return gulp.src(['server/**/*.js'])
        .pipe(esformatter())
        .pipe(gulp.dest('server')).on('error', errorAlert);
});
