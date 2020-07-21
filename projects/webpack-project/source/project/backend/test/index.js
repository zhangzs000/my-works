const assert = require('assert');

// it('一加一等于二', function() {
//   assert.equal(1 + 1, 2);
// });

const request = require('supertest');
const app = require('../index');

describe('接口测试', function() {
  describe('测试获取菜单 /menus', function() {
    it('返回一个对象，success为false', function(done) {
      request(app)
        .get('/menus')
        .expect(200)
        .end(function(err, res) {
          console.log(res.body);
          assert.equal(res.body.success, false);
          if (err) done(err);
          else done();
        });
    });
  });
});
