//var gulp = require('gulp');
//var mocha = require('gulp-spawn-mocha');

var gulp = require('gulp');

var gulpCommon = require('./common/gulpCommon');
var envCommon = require('./common/envCommon');


/*
if (process.env.NODE_ENV === envCommon.ENV_DEV) {
  console.log('mongo-start: running init.sh');

  gulpCommon.runCommandSync('gulpfile: ', 'source ../bin/init.sh', []);
}*/

//https://github.com/knpwrs/gulp-spawn-mocha
gulp.task('mongo-start', [], function() {
    console.log('mongo-start: running mongo:run');
    //export latest bash utils scripts globally - TEMP!
    gulpCommon.runCommandSync('mongo-start TEMP!: ', process.env.BASH_UTILS_HOME+'/deploy-local.sh', []);
    //start mongo
    gulpCommon.runCommandSync('mongo-start: ', 'rerun', ['mongo:run']);
});

