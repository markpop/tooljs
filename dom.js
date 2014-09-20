var _Dom = (function (d) {
  var _Dom = function () {};
  _Dom.prototype.getElementsByClass = function (className, parent, tag) {
    var result = [];
    // 判断是否有原生的方法
    if (d.getElementsByClassName) {
      var elements = (parent || d).getElementsByClassName(className),
          item = null;
      for (var i = elements.length - 1; i >= 0; i--) {
        item = elements[i];
        // 判断tag是否存在
        if (tag) {
          if (item.tagName === tag.toUpperCase()) {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      };
      return result;
    } else {
      parent = parent || d;
      tag = tag || '*';
      var classes = className.split(' '), // 将用户输入的class转为数组
          elements = (tag === '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);
          patterns = [],
          reg = null,
          item = null,
          flag = false;
      // 将class数组转为正则数组
      for (var i = classes.length - 1; i >= 0; i--) {
        reg = new RegExp('(^|\\s)'+ classes[i] +'(\\s|$)');
        patterns.push(reg);
      };
      // 遍历父元素
      for (var i = elements.length - 1; i >= 0; i--) {
        item = elements[i];
        flag = false;
        // 遍历正则数组
        for (var j = patterns.length - 1; j >= 0; j--) {
          // 是否匹配
          flag = patterns[j].test(item.className);
          // 一旦不匹配就跳出循环
          if (!flag) {
            break;
          }
        };
        if (flag) {
          result.push(item);
        }
      };
      return result;
    }
  };
  _Dom.prototype.addClass = function (element, className) {
    // 将className转化成数组
    var classes = className.split(' '),
        flag = false;
    for (var i = classes.length - 1; i >= 0; i--) {
      // 遍历classes数组，判断是否跟元素的class重复
      flag = (new RegExp('\\b'+classes[i]+'\\b')).test(element.className);
      if (!flag) {
        element.className += ' ' + classes[i];
      }
    };
  };
  return _Dom;
})(document);