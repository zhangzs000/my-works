const express = require('express');
const utils = require('./utils');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send(
      utils.success([
        {
          id: 1,
          name: '大学计算机基础',
          time: '8:00~9:35',
          teacher: '陈老师',
          capacity: 100,
          ocupied: 20,
          remain: 80
        }
      ])
    );
  })
  .post((req, res) => {
    res.send(utils.success('添加成功！'));
  })
  .put((req, res) => {
    res.send(utils.success('修改成功！'));
  });

router.delete('/:id', (req, res) => {
  res.send(utils.success('删除成功！'));
});

module.exports = router;
