var _Event = (function (w) {
  var _Event = function () {};
  // 添加事件处理
  _Event.prototype.addHandler = function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  };
  // 移除事件处理
  _Event.prototype.removeHandler = function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  };
  // 获取event对象
  _Event.prototype.getEvent = function (event) {
    return event ? event : w.event;
  };
  // 获取目标对象
  _Event.prototype.getTarget = function (event) {
    return event.target || event.srcElement; 
  };
  // 阻止默认事件
  _Event.prototype.preventDefault = function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  };
  // 阻止冒泡事件
  _Event.prototype.stopPropagation = function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  };
  return _Event;
})(window);