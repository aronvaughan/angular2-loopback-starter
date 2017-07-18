'use strict';

module.exports = function(app) {

  var UserInfo = app.models.UserInfo;
  var Address = app.models.Address;

  var createFunction = function(message, callback) {
    //console.log('create function called', message, callback);
    return function(err, createdData) {
      if (err) return console.log('%j', err);
      //console.log(message, createdData);
      if (callback) {
        callback(createdData);
      }
    }
  };

  var createAddress = function ( userInfo, address ) {
    //console.log('creating address for user', userInfo, address);
    //userInfo.addresses.create( address, createFunction('created address'));
    //OR
    address.refType = "UserInfo";
    address.refId = userInfo.id;
    Address.create(address, createFunction('created address w/o object passthrough'));
  };

  var createUserInfo = function (userInfo, address) {
    //console.log('creating user info', userInfo, address);
    UserInfo.create(userInfo, createFunction('created user info', function (userInfo) {
      //console.log('user info callback called', userInfo);
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

  console.log("Creating test user info....");
  for (var i = 0; i < data.length; i++) {
    createUserInfo(data[i].userInfo, data[i].address);
  }

  console.log("Test user info created...");


};



