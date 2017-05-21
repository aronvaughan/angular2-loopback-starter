//var gulp = require('gulp');
//var mocha = require('gulp-spawn-mocha');

var gulp = require('gulp');

var gulpCommon = require('./common/gulpCommon');
var envCommon = require('./common/envCommon');


//https://github.com/knpwrs/gulp-spawn-mocha
gulp.task('run', ['mongo-start'], function() {
    console.log('run: starting application');
    gulpCommon.runCommandSync('run: ', 'npm', ['start']);
});

