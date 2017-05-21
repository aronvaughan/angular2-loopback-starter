var replace = require('gulp-replace');
var gutil = require('gulp-util');
var gulpCommon = require('./common/gulpCommon');
var gulp = require('gulp');

var src_file='www/js/_template/index.js';
var dst_dir='www/js/';

gulp.task('cd-to-mobile-dir', function () {
  process.chdir('mobileapp');
});

gulp.task('prep-android',  ['cd-to-mobile-dir'], function(){
  gutil.log('prepping android deploy', process.env.MOBILE_HOST_ANDROID);
  gulp.src(src_file)
    .pipe(replace('{MOBILE_HOST}', process.env.MOBILE_HOST_ANDROID))
    .pipe(gulp.dest(dst_dir));
});

gulp.task('prep-default', ['cd-to-mobile-dir'], function(){
  gulp.src(src_file)
    .pipe(replace('{MOBILE_HOST}', process.env.MOBILE_HOST))
    .pipe(gulp.dest(dst_dir));
});

gulp.task('buildAndroid', ['prep-android'], function(){
  gulpCommon.runCommandSync('mobile.js', 'cordova', ['build', 'android']);
});

gulp.task('buildIos', ['prep-default'], function(){
  gulpCommon.runCommand('mobile.js', 'cordova', ['build', 'ios']);
});

gulp.task('runAndroid', ['buildAndroid'], function(){
  gulpCommon.runCommandSync('mobile.js', 'cordova', ['run' , 'android']);
});

gulp.task('runIos', ['buildIos'], function(){
  gulpCommon.runCommand('mobile.js', 'cordova', ['run', 'ios']);
});



