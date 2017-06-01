'use strict';

var LineItemTypeEnum = require('../../common/enum/LineItemTypeEnum');

module.exports = function(app) {

  var LineItemType = app.models.LineItemType;

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

  var createLineItem = function (lineItem) {
    console.log('creating line item', lineItem);
    LineItemType.create(lineItem, createFunction('created line item', function (lineItem) {
      console.log('line item callback called', lineItem);

    }));
  };

  var data = Object.values(LineItemTypeEnum);


  /*
  var data = [
    { name: "Salary", lineItemGroup: "GrossEarning", canClientEnter: true}
  ];
  */

  console.log("Creating test user info....", data);
  for (var i = 0; i < data.length; i++) {
    createLineItem(data[i]);
  }

  console.log("Line Item info created...");

};



