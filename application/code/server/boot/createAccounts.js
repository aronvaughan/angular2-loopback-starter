'use strict';

module.exports = function(app) {

  var Account = app.models.Account;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  //var Team = app.models.Team;

  var makeAdmin = function (account) {
    //...
    // Create projects, assign project owners and project team members
    //...
    // Create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return console.log(err);
      console.log(role);

      // Make Admin an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: account.id
      }, function(err, principal) {
        if (err) return debug(err);
        console.log(principal);
      });
    });
  };

  var createAccount = function (account, makeAdmin) {
    //create a set of accounts
    Account.create(account, function(err, account) {
      if (err) return console.log('%j', err);
      if (makeAdmin === true) {
        makeAdmin(account);
      }
    });
  };

  var findAccount = function (account, makeAdmin) {
    //Account.findById(account.id, function(err, instance) {
    Account.findOne({where: {username: account.username}}, function(err, instance) {
      if (err) return console.log("Error finding accounts", err, account);
      if (!instance) {
        console.log("creating account: ", account);
        createAccount(account, makeAdmin);
      } else {
        console.log("account already exists: ", instance.username);
      }

    });
  };

  /*
  var accountsWId = [
    {id: 'admin', username: 'admin', email: 'admin@admin.com', password: 'admin'},
    {id: 'account', username: 'user', email: 'user@user.com', password: 'user'}
  ];
  */

  var accountsWoId = [
    {username: 'admin', email: 'admin@admin.com', password: 'admin'},
    {username: 'user', email: 'user@user.com', password: 'user'},
    {username: 'aron', email: 'aronvaughan@hotmail.com', password: 'aron'}
  ];

  var accounts = accountsWoId;

  console.log("Creating test accounts....");
  for (var i = 0; i < accounts.length; i++) {
    findAccount(accounts[i], false);
    console.log("Creating test account...."+accounts[i].username);
  }
  console.log("Test accounts created...");
};



