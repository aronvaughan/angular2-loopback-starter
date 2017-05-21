
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;

var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var gulp = require('gulp');



module.exports = {

    runCommand: function(loggingPrefix, command, args) {
        var cmd = spawn(command, args, {shell: true});

        var pre = '';
        if (loggingPrefix) {
            pre = loggingPrefix + ': ';
        }

        cmd.on('close', function (code) {
            console.log('my-task exited with code ' + code);
            //FIXME::
            //cb(code);
        });

        cmd.on('error', function (err) {
            console.log('Failed to start child process.', err);
        });

        cmd.stdout.on('data', function(data) {
           // data = str.replace(/\r?\n|\r/g, " ");
            data = ''+data;
            console.log(pre + data.trim());
        });

        cmd.stderr.on('data', function (data) {
           // data = str.replace(/\r?\n|\r/g, " ");
            data = ''+data;
            console.log(pre + data.trim());
        });
        /*
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (err !== null) {
                console.log('exec error: ' + err);
            }
        });
        */
    },

    runCommandSync: function(loggingPrefix, command, args) {
    var cmd = spawnSync(command, args, {stdio: 'inherit'});

    var pre = '';
    if (loggingPrefix) {
      pre = loggingPrefix + ': ';
    }

    console.log(pre + ' ' + command + ' exited with code ' + cmd.status);
    if (cmd.error) {
      console.log(pre + ' Failed to start child process.', cmd.error);
      console.log(pre + cmd.output);
    }

    return cmd;
  }
};
