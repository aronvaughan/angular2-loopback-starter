
var gulp = require('gulp');

var gulpCommon = require('./common/gulpCommon');
var envCommon = require('./common/envCommon');

//https://github.com/knpwrs/gulp-spawn-mocha
gulp.task('angularGenClient', [], function() {
  console.log('angular: generating client code from loopback server');
  gulpCommon.runCommandSync('angular-gen-client: ', 'mkdir', ['-p', 'client/src/app/shared/angular-client']);
  //gulpCommon.runCommandSync('angular-gen-client: ', 'lb-ng', ['server/server.js', 'client/src/js/angular-client/lb-services.js']);
  gulpCommon.runCommandSync('angular-gen-client: ', './node_modules/.bin/lb-sdk', ['server/server.js', 'client/src/app/shared/angular-client/' ])
});

