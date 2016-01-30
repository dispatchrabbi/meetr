const uuid = require('node-uuid');

module.exports = {
  generate: function _generate() {
    return uuid.v4();
  },
};
