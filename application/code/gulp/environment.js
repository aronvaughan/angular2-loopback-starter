var gulp = require('gulp');

var envCommon = require('./common/envCommon');

function showEnvironment() {
    console.log('========================');
    console.log('ENV: '+process.env.NODE_ENV);
    console.log('========================');
}

gulp.task('set-dev-node-env', function() {
    process.env.NODE_ENV = envCommon.ENV_DEV;
    showEnvironment();
    return process.env.NODE_ENV;
});

gulp.task('set-stg-node-env', function() {
    process.env.NODE_ENV = envCommon.ENV_STG;
    showEnvironment();
    return process.env.NODE_ENV;
});

gulp.task('set-prd-node-env', function() {
    process.env.NODE_ENV = envCommon.ENV_PRD;
    showEnvironment();
    return process.env.NODE_ENV;
});
