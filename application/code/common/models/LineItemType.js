var utils = require('../../node_modules/loopback/lib/utils');
var remoteMethodVisibility = require('../utils/remoteMethodVisibility');

module.exports = function(LineItemType) {

  remoteMethodVisibility.makeReadOnly(LineItemType);

};
