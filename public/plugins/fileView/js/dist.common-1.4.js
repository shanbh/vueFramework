 String.prototype.endWith=function(s){
  if(s==null||s==""||this.length==0||s.length>this.length)
     return false;
  if(this.substring(this.length-s.length)==s)
     return true;
  else
     return false;
  return true;
 }
 String.prototype.startWith=function(s){
  if(s==null||s==""||this.length==0||s.length>this.length)
   return false;
  if(this.substr(0,s.length)==s)
     return true;
  else
     return false;
  return true;
 }

//判断是否为IE
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}
//判断是否为Chrome
function isChrome() {
    return window.navigator.userAgent.indexOf("Chrome") != -1;
}
//判断是否为Firefox
function isFirefox() {
    return navigator.userAgent.indexOf('Firefox') >= 0;
}
//判断是否为Opera
function isOpera() {
    return navigator.userAgent.indexOf('Opera') >= 0;
}
//是否为ie9以下的浏览器
function isLessIE9() {
    try {
        var binfo = browserInfo();
        if(binfo.msie&&parseInt(binfo.version)<9)
            return true;
        return false;
    } catch (error) {
        return true;
    }
}
//获取浏览器信息
function browserInfo() {
    var browser = {
        msie: false,//IE浏览器
        chrome: false,//谷歌浏览器
        firefox: false,//火狐浏览器
        opera: false,//opera浏览器
        safari: false,//safrai浏览器
        name: 'unknown',//正在使用的浏览器的名字
        version: 0//正使用浏览器的版本号
    },
    userAgent = window.navigator.userAgent.toLowerCase();
// 使用正则对用户当前浏览器进行判断
    if (/(msie|chrome|firefox|opera|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
        browser[RegExp.$1] = true;
        browser.name = RegExp.$1;
        browser.version = RegExp.$2;
    } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) {
        browser.safari = true;
        browser.name = 'safari';
        browser.version = RegExp.$2;
    }
    return browser;
}
//是否支持html5
function checkhHtml5() {   
    return !!document.createElement('canvas').getContext;
}
//判断插件是否存在
function checkPlugins(pluginsName, activexObjectName) {
    // 通常ActiveXObject的对象名称是两个插件名称的组合
    if (activexObjectName == '') activexObjectName = pluginsName + "." + pluginsName;

    var np = navigator.plugins;
    // 针对于IE
    if (isIE()) {
        try {
            var axobj = eval("new ActiveXObject(activexObjectName);");
            // 将对象转化为布尔类型
            return axobj ? true : false;
        } catch (e) {
            return false;
        }
    }
        // 针对于FF等非IE
    else if (np && np.length) {
        for (var i = 0; i < np.length; i++) {
            if (np[i].name.indexOf(pluginsName) != -1) return true;
        }
        return false;
    }
    else {
        // 以上情况都排除则返回false
        return false;
    }
}
//查找参数值
function getQueryParam(param) {
    var LocString = window.document.location.href;
    var rs = new RegExp("(^|)" + param + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    // parameter cannot be found
    return "";
}
//获取地址
function getBasePath()
{
    var href = window.location.href;
    var search = window.location.search;
    var index = href.replace(search, "").lastIndexOf("/");
    var url = href.substring(0,index);
    return url;
}

function getFileUrl() {
    var url = getQueryParam('src');
    if(!(url.startWith('http')||url.startWith('http'))){
        url = getBasePath()+'/'+url;
    }
    return url;
}