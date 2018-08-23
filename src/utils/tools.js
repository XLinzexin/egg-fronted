Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "D+": this.getDate(), //day
    "H+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(Y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};

var parseQueryString = function(url) {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
    arr_url = reg_url.exec(url),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1],
      result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
};
window.location.query = function() {
  return parseQueryString(window.location.href);
};
