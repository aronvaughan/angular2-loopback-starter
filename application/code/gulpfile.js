var RequireDir = require('require-dir');
var gulp = require('gulp');

global.inProduction = process.env.NODE_ENV === 'production';

RequireDir('./gulp');

gulp.task('setup', ['set-dev-node-env'], function() {
    //no-op but we can do other things....
});

gulp.run('setup');




