var loopback = require('loopback');

var states = require('../utils/states');

console.log("loading state reciprocity extension: StateReprocity.js");

var properties = {
  stateCode: {
    type: String,
    required: true,
    enum: states.getStateCodes()
  },
  reciprocalStateCode: {
    type: String,
    required: true,
    enum: states.getStateCodes()
  }
};

var options = {
  /*
  relations: {
    accessTokens: {
      model: accessToken,
      type: hasMany,
      foreignKey: userId
    },
    account: {
      model: account,
      type: belongsTo
    },
    transactions: {
      model: transaction,
      type: hasMany
    }
  },
  acls: [{
    permission: ALLOW,
    principalType: ROLE,
    principalId: $everyone,
    property: myMethod
  }]
};*/
};

var stateReciprocity = loopback.Model.extend('StateReciprocity', properties, options);

//module.exports = stateReciprocity;
module.exports = function(StateReciprocity) {

   StateReciprocity.validatesInclusionOf('stateCode', {in: states.getStateCodes(), allowNull: false, message: 'Not a valid state code'});
   StateReciprocity.validatesInclusionOf('reciprocalStateCode', {in: states.getStateCodes(), allowNull: false, message: 'Not a valid state code'});

};
