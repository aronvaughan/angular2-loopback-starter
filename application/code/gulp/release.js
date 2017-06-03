var gulp = require('gulp');
var bump = require('gulp-bump');
var readJson = require('read-package-json')
var git = require('gulp-git');

// readJson(filename, [logFunction=noop], [strict=false], cb)

var sourceVersion = undefined;
//var dryRun='--dry-run';
var dryRun='';

function readVersion(callback) {
  readJson('./package.json', console.error, false, function (er, data) {
    if (er) {
      console.error("There was an error reading the file", er);
      return
    }

    sourceVersion = data.version;
    /*
    console.log('=======================');
    console.log('Version is ', sourceVersion);
    console.log('=======================');
    */

    if (callback) {
      callback(er,sourceVersion);
    }

    //console.error('the package data is', data);
  });
}

function bannerMessage(message) {
  console.log('========================');
  console.log(message);
  console.log('========================');
}

function showVersion() {
  bannerMessage('Version is: '+sourceVersion);
}


function readAndShowVersion(callback) {

  readVersion(function(err, data) {
    if (err) {
      console.error("There was an error reading the file", er);
      return
    }
    showVersion();
    callback();
  });

}

gulp.task('readVersion', function(callback) {
  readAndShowVersion(callback);
});

gulp.task('bumpPatch', function(){

  //by returning the pipe, we can have other tasks wait on this to complete as a dependecy
  return gulp.src('./package.json')
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));

});

gulp.task('bumpVersion', ['bumpPatch'], function(callback) {
  return readAndShowVersion(callback);
});

gulp.task('bumpAndCommitVersion', ['bumpVersion'], function() {
  bannerMessage('committing version: '+sourceVersion);
  return gulp.src('./package.json')
    .pipe(git.add({args: '--dry-run --verbose'}))
    .pipe(git.commit('version '+sourceVersion, {args: dryRun+' --verbose'}));
});

gulp.task('pushVersion', ['bumpAndCommitVersion'], function() {
  bannerMessage('pushing version: '+sourceVersion);
  return git.push('origin', 'master', {args: dryRun+' --verbose'}, function (err) {
    if (err) {
      console.log('error in push!!!!');
      throw err;
    }
  });
});

// ABOVE WORKS WITH DY RUN

gulp.task('tagVersion', ['pushVersion'], function() {
  bannerMessage('tagging version: '+sourceVersion);
  return git.tag('t_'+sourceVersion, 'Version: '+sourceVersion, {args: dryRun}, function (err) {
    if (err) throw err;
  });
});

gulp.task('branchVersion', ['tagVersion'], function() {
  bannerMessage('branching version: '+sourceVersion);
  return git.branch('b_'+sourceVersion, {args: dryRun+" --verbose"}, function (err) {
    if (err) throw err;
  });
});

gulp.task('release', ['branchVersion'], function() {
  bannerMessage('releasing version: '+sourceVersion);
});

