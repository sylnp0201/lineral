function fetchValue(obj, path) {
  if (typeof path !== 'string') {
    return null;
  }
  return path.split('.').reduce((value, key) => {
    if (value === null) return null;

    if (Array.isArray(value)) {
      const match = key.match(/^\[(\d+)\]$/);
      if (match && match.length > 0) {
        const idx = parseInt(match[1]);
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
}

module.exports = function(obj = null, path) {
  if (arguments.length < 2) {
    return function(path) {
      return fetchValue(obj, path);
    }
  } else {
    return fetchValue(obj, path);
  }
}
