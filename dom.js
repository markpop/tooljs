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
        elementClass = element.className;
    for (var i = classes.length - 1; i >= 0; i--) {
      // 遍历classes数组，判断是否跟元素的class重复
      if (!this.hasClass(element, classes[i])) {
        // 判断元素的class是否为空
        if (elementClass) {
          elementClass += ' ' + classes[i];
        } else {
          elementClass += classes[i];
        }
      }
    };
    // 将元素className替换成处理过的className
    element.className = elementClass;
  };
  _Dom.prototype.removeClass = function (element, className) {
    // 将要查找的className和元素的className转化为数组
    var classes = className.split(' '),
        elementClasses = element.className.split(' ');
    for (var i = classes.length - 1; i >= 0; i--) {
      for (var j = elementClasses.length - 1; j >= 0; j--) {
        // 如果出现重复就删除
        if (classes[i] === elementClasses[j]) {
          elementClasses.splice(j, 1);
        }
      };
    };
    // 将元素className替换成处理过的className
    element.className = elementClasses.join(' ');
  };
  _Dom.prototype.toggleClass = function (element, className) {
    // 判断元素是否有这个class
    if (this.hasClass(element, className)) {
      var elementClasses = element.className.split(' ');
      for (var i = elementClasses.length - 1; i >= 0; i--) {
        if (elementClasses[i] === className) {
          elementClasses.splice(i, 1);
        }
      };
      element.className = elementClasses.join();
    } else {
      // 判断元素的class是否为空
      if (element.className) {
        element.className += ' ' + className;
      } else {
        element.className += className;
      }
    }
  };
  _Dom.prototype.hasClass = function (element, className) {
    return (new RegExp('(^|\\s)'+className+'(\\s|$)')).test(element.className);
  };
  _Dom.prototype.tmpl = function (tpl, data) {
    var regVar = /<%([^%>]+)?%>/g,
        regCon = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        code = 'var r = [];\n';
        match = null,
        cursor = 0,
        add = function(line, js) {
          if (js) {
            if (line.match(regCon)) {
              code += line+'\n';
            } else {
              code += 'r.push(this.'+line+');\n';
            }
          } else {
            code += 'r.push("'+line.replace(/"/g, '\\"')+'");\n';
          }
        };
    while(match = regVar.exec(tpl)) {
      add(tpl.slice(cursor, match.index));
      add(match[1], true);
      cursor = match.index + match[0].length;
    }
    add(tpl.slice(cursor, tpl.length));
    code += 'return r.join("")';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
  };
  return _Dom;
})(document);