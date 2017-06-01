// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var config = require('../../server/config.json');
var path = require('path');

module.exports = function(Account) {

  console.log('module account extension called');

  //send password reset link when requested
  Account.on('resetPasswordRequest', function(info) {
    console.log( 'got reset password request event', info);
    var url = 'http://' + config.webhost + ':' + config.webport + '/reset-password';
    var html = 'Click <a href="' + url + ';access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    Account.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  Account.remoteMethod('changePasswordForgot', {
    http: {path: '/changePasswordForgot', verb: 'post'},
    accepts: [
      {arg: 'newPassword', type: 'string'},
      {arg: 'confirmPassword', type: 'string'},
      {arg: 'accessToken', type: 'string'}
      ],
    returns: []
  });

  Account.changePasswordForgot = function(newPassword, confirmPassword, accessToken, cb) {

    if (!accessToken) {
      var error = new Error("Token not found!");
      error.status = 401;
      return cb(error);
    }

    //verify passwords match
    if (! newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword) {
      var error = new Error("Passwords do not match!");
      error.status = 401;
      return cb(error);
    }

    console.log('looking up account by token', accessToken);
    Account.relations.accessTokens.modelTo.findById(accessToken, function(err, accessToken) {
      if (err) return next(err);
      if (!accessToken) return cb(new Error('could not find the given token'));

      console.log('token found', accessToken);
      accessToken.validate(function (err, isValid) {

        if (err) return cb(err);
        if (!isValid) {
          console.log('token is not VALID!!!!');
          var error = new Error('token is not valid!!');
          error.statue=401
          return cb();
        }

        // Look up the user associated with the access token
        Account.findById(accessToken.userId, function (err, user) {
          if (err) return cb(err);
          if (!user) return cb(new Error('could not find a valid user with the given token'));

          user.updateAttribute('password', newPassword, function (err, user) {
            if (err) return res.sendStatus(404);
            console.log('> password reset processed successfully', user);
            cb(null, 'Password changed.');
          });
        });
      });
    });
  };

};
