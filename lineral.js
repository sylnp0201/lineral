'use strict';

module.exports = function () {
  var obj = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var path = arguments[1];

  if (typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce(function (value, key) {
    if (value === null) return null;

    if (Array.isArray(value)) {
      var match = key.match(/^\[(\d+)\]$/);
      if (match && match.length > 0) {
        var idx = parseInt(match[1]);
        return value.length > idx ? value[idx] : null;
      } else {
        return null;
      }
    } else if (value.hasOwnProperty(key)) {
      return value[key];
    } else {
      return null;
    }
  }, obj);
};
