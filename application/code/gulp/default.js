var gulp = require('gulp');

var taskListing = require('gulp-task-listing');

// Add a task to render the output
gulp.task('help', taskListing);

gulp.task("default", ['help']);

//Gulp.task('default', ['watch', 'build', 'nodemon', 'media'/*, 'open-browser'*/]);
