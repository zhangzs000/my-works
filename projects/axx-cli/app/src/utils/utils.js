const Utils = {}

Utils.StringIndex = (str) => {
  let seed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return seed.indexOf(str)
}

Utils.getCookie = (name) => {
  let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

Utils.setCookie = (obj, time) => {
  let str = time * 24 * 60 * 60 * 1000
  let exp = new Date();
  exp.setTime(exp.getTime() + str);
  for(let key in obj) {
    document.cookie = key + "="+ escape (obj[key]) + ";expires=" + exp.toGMTString();
  }
}

Utils.clearCookie = () => {
  let keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i =  keys.length; i--;)
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
  }
}

export default Utils