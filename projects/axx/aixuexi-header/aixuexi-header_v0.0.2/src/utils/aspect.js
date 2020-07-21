/**
 * 面向切面, 提供开始和结束, 无侵入式编程
 * @author libaoxu@gaosiedu.com 2016-12-20
 * 
 * @example
 * 
 * test.before(function () {
 *  console.time('test');
 * }).after(function () {
 *  console.time('test');
 * })
 */ 

Function.prototype.before = function (fn) {
    var _self = this;

    return function () {
        var value = fn.apply(_self, arguments);
        if (value === false) {
            return false;
        }
        return _self.apply(this, arguments);
    };
};

// 默认函数执行了两遍, 这样
Function.prototype.after = function (fn) {
    // 是先执行本身 this, 再执行回调
    var _self = this;
    return function () {
        var result = _self.apply(this, arguments);
        var value = fn.apply(_self, arguments);
        if (value === false) {
            return false;
        }
        return result;
    }
};

