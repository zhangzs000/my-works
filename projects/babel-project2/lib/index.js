'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
  function Person() {
    _classCallCheck(this, Person);

    this.name = "bigbigStrong";
  }

  _createClass(Person, [{
    key: 'sayName',
    value: function sayName() {
      console.log('my name is ' + this.name);
    }
  }], [{
    key: 'install',
    value: function install() {
      console.log('static');
      this.modules.push('123');
    }
  }]);

  return Person;
}();

Person.modules = {};

var p = new Person();
p.sayName();
Person.install();
console.log(Person.modules);