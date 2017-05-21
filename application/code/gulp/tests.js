//var gulp = require('gulp');
//var mocha = require('gulp-spawn-mocha');

var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');

var gulpCommon = require('./common/gulpCommon');

//https://github.com/knpwrs/gulp-spawn-mocha
gulp.task('test', ['prettify', 'lint'], function() {
    return gulp
        .src(['test/**/*.*test.js'])
        .pipe(mocha({
            debug: true,
            istanbul: {
                dir: 'target/coverage',
                //AV: get thresholds working!
                enforceThresholds: {
                    thresholds: {
                        global: {
                            statements: 80,
                            branches: 80,
                            lines: 80,
                            functions: 90
                        },
                        each: 80
                    }
                }
            }
        }));
});

gulp.task('test-report', function() {
    gulpCommon.runCommand('test-report', 'open', ['target/coverage/lcov-report/index.html']);
});
