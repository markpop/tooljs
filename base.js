var _Base = (function () {
  var _Base = function () {};
  _Base.prototype.has = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };
  _Base.prototype.each = function (obj, iterator, context) {
    var navtiveForEach = Array.prototype.forEach;
    if (navtiveForEach && obj.forEach === navtiveForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        iterator.call(context, obj[i], i, obj);
      };
    } else {
      for (var key in obj) {
        if (this.has(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      };
    }
  };
  _Base.prototype.map = function (obj, iterator, context) {
    var navtiveMap = Array.prototype.map,
        results = [];
    if (navtiveMap && obj.map === navtiveMap) {
      return obj.map(iterator, context);
    }
    this.each(obj, function (value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) {
      results.length = obj.length;
    }
    return results;
  };
  return _Base;
})();