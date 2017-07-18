var usStates = require('us-states');

module.exports = {

  getStateCodes: function() {
     return Object.keys(usStates)
  }

};
