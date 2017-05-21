'use strict';

module.exports = function(app) {

  var UserInfo = app.models.UserInfo;
  var Address = app.models.Address;

  var createFunction = function(message, callback) {
    console.log('create function called', message, callback);
    return function(err, createdData) {
      if (err) return console.log('%j', err);
      console.log(message, createdData);
      if (callback) {
        callback(createdData);
      }
    }
  };

  var createAddress = function ( userInfo, address ) {
    console.log('creating address for user', userInfo, address);
    //userInfo.addresses.create( address, createFunction('created address'));
    //OR
    address.refType = "UserInfo";
    address.refId = userInfo.id;
    Address.create(address, createFunction('created address w/o object passthrough'));
  };

  var createUserInfo = function (userInfo, address) {
    console.log('creating user info', userInfo, address);
    UserInfo.create(userInfo, createFunction('created user info', function (userInfo) {
      console.log('user info callback called', userInfo);
      createAddress(userInfo, address);
    }));
  };


  var address1 = {
    line1: "4412 Fish Way",
    city: "Austin",
    state: "TX",
    zip: 78749
  };

  var address2 = {
    line1: "100 No Way",
    city: "Dallas",
    state: "TX",
    zip: 76262
  };

  var data = [
    { userInfo: {}, address: address1 },
    { userInfo: {}, address: address2 }
  ];

  console.log("Creating test user info....", data);
  for (var i = 0; i < data.length; i++) {
    createUserInfo(data[i].userInfo, data[i].address);
  }

  console.log("Test user info created...");

  /*
  var findUser = function (user, makeAdmin) {
    //User.findById(user.id, function(err, instance) {
    User.findOne({where: {username: user.username}}, function(err, instance) {
      if (err) return console.log("Error finding users", err, user);
      if (!instance) {
        console.log("creating user: ", user);
        createUser(user, makeAdmin);
      } else {
        console.log("user already exists: ", instance);
      }

    });
  };
  */

  /*

  var userInfo = [
    {},
    {}
  ];

  var users = usersWoId;

  console.log("Creating test users....", users);
  for (var i = 0; i < users.length; i++) {
    findUser(users[i], false);
  }
  console.log("Test users created...");
  */
};



