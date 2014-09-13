// 客户端检测
var Client = (function (w, nav) {
  var Client = function () {
    // 呈现引擎
    this.engine = {};
    // 浏览器
    this.brower = {};
    // 系统平台
    this.system = {};
    // 初始化
    this.init();
  };
  Client.prototype.init = function () {
    var ua = nav.userAgent,
        p = nav.platform;
    // 检测呈现引擎和浏览器
    if (w.opera) {
      // opera
      this.engine.name = this.brower.name = 'opera';
      this.engine.ver = this.brower.ver = w.opera.version();
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
      this.engine.name = 'webkit';
      this.engine.ver = RegExp['$1'];
      if (/Chrome\/(\S+)/.test(ua)) {
        // chrome
        this.brower.name = 'chrome';
        this.brower.ver = RegExp['$1'];
      } else if (/Version\/(\S)+/.test(ua)) {
        // safari
        this.brower.name = 'safari';
        this.brower.ver = RegExp['$1'];
      } else {
        // 近似确定版本号
        var safariVersion = 1,
            webkitVersion = parseFloat(engine.ver);
        if (webkitVersion < 100) {
          safariVersion = 1;
        } else if (webkitVersion < 312) {
          safariVersion = 1.2;
        } else if (webkitVersion < 412) {
          safariVersion = 1.3;
        } else {
          safariVersion = 2;
        }
        this.brower.name = 'safari';
        this.brower.ver = safariVersion;
      }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
      // konq
      this.engine.name = 'khtml';
      this.brower.name = 'konq';
      this.engine.ver = this.brower.ver = RegExp['$1'];
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
      this.engine.name = 'gecko';
      this.engine.ver = RegExp['$1'];
      if (/Firefox\/(\S+)/.test(ua)) {
        // firefox
        this.brower.name = 'firefox';
        this.brower.ver = RegExp['$1'];
      } else {
        this.brower.name = null;
        this.brower.ver = null;
      }
    } else if (/MSIE ([^;]+)/.test(ua)) {
      // IE
      this.engine.name = this.brower.name = 'ie';
      this.engine.ver = this.brower.ver = RegExp['$1'];
    } else {
      this.engine.name = this.brower.name = null;
      this.engine.ver = this.brower.ver = null;
    }

    // 检测系统平台
    // 移动设备
    if (ua.indexOf('iPhone') > -1) {
      this.system.mobile = {};
      this.system.mobile.name = 'iphone';
      this.system.mobile.ver = null;
    } else if (ua.indexOf('iPod') > -1) {
      this.system.mobile = {};
      this.system.mobile.name = 'ipod';
      this.system.mobile.ver = null;
    } else if (ua.indexOf('iPad') > -1) {
      this.system.mobile = {};
      this.system.mobile.name = 'ipad';
      this.system.mobile.ver = null;
    } else if (ua.indexOf('NokiaN') > -1) {
      this.system.mobile = {};
      this.system.mobile.name = 'nokian';
      this.system.mobile.ver = null;
    } else if (/Android (\d+\.\d+)/.test(ua)) {
      this.system.mobile = {};
      this.system.mobile.name = 'android';
      this.system.mobile.ver = RegExp['$1'];
    }
    // 游戏设备
    if (ua.indexOf('Wii') > -1) {
      this.system.game = {};
      this.system.game.name = 'wii';
      this.system.game.ver = null;
    } else if (/playstation/i.test(ua)) {
      this.system.game = {};
      this.system.game.name = 'ps';
      this.system.game.ver = null;
    }

    if (p.indexOf('Win') == 0) {
      // Windows
      this.system.name = 'win';
      if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
        if (RegExp['$1'] == 'NT') {
          switch (RegExp['$2']) {
            case '5.0':
              this.system.ver = '2000';
              break;
            case '5.1':
              this.system.ver = 'XP';
              break;
            case '6.0':
              this.system.ver = 'Vista';
              break;
            case '6.1':
              this.system.ver = '7';
              break;
            default:
              this.system.ver = 'NT';
          }
        } else if (RegExp['$1'] == '9x') {
          this.system.ver = 'ME';
        } else {
          this.system.ver = RegExp['$1'];
        }
        // 检测Windows CE或Windows Phone
        if (this.system.ver == 'CE') {
          this.system.mobile = {};
          this.system.mobile.name = 'ce';
          this.system.mobile.ver = 'CE';
        } else if (this.system.ver == 'Ph') {
          if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            this.system.ver = 'Phone';
            this.system.mobile = {};
            this.system.mobile.name = 'phone';
            this.system.mobile.ver = RegExp['$1'];
          }
        }
      }
    } else if (p.indexOf('Mac') == 0) {
      // Mac
      this.system.name = 'mac';
      this.system.ver = null;
      // 检测IOS版本号
      if (ua.indexOf('Mobile') > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
          this.system.mobile.ver = RegExp.$1.replace('_', '.');
        } else {
          this.system.mobile.ver = 2;
        }
      }
    } else if (p == 'X11' || p.indexOf('Linux') == 0) {
      // Unix or Linux
      this.system.name = 'x11';
      this.system.ver = null;
    }
  };
  Client.prototype.isHostMethod = function (object, property) {
    // author: Peter Michaux
    var t = typeof object[property];
    return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';
  };
  return Client;
})(window, navigator);