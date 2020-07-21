const express = require('express');
const utils = require('./utils');
const router = express.Router();
const db = require('./db/mongo');
const consts = require('./const');
const collectionName = consts.COURSE;
const ObjectID = require('mongodb').ObjectID;

router
  .route('/')
  .get((req, res) => {
    // 默认查询条件
    let query = {};
    // 关键字查询条件
    let key = req.query.key;
    if (req.session.role === '2') {
      // 教师
      if (key) {
        query = {
          $and: [
            { name: { $regex: key } },
            { teacher: ObjectID(req.session.user._id) }
          ]
        };
      } else {
        query = {
          teacher: ObjectID(req.session.user._id)
        };
      }
      db.find(collectionName, query).then(data => {
        res.send(utils.success(data));
      });
    } else {
      // 管理员和学生
      if (key) {
        query = {
          // 查询课程名称或任课老师字段内包含关键字的数据
          $or: [{ name: { $regex: key } }, { 'teacher.name': { $regex: key } }]
        };
      }
      let lookup = {
        // 关联集合的名称
        from: consts.TEACHER,
        // 当前集合内中的字段
        localField: 'teacher',
        // 关联集合中的字段
        foreignField: '_id',
        // 别名
        as: 'teacher'
      };
      db.aggregate(collectionName, lookup, query).then(data => {
        data.forEach(model => {
          model.teacher = model.teacher[0];
        });
        res.send(utils.success(data));
      });
    }
  })
  .post((req, res) => {
    // 根据输入信息创建模型对象，设置创建时间，已选人数和剩余人数
    const model = Object.assign({}, req.body);
    delete model._id;
    model.createTime = new Date();
    model.capacity = parseInt(model.capacity);
    model.ocupied = 0;
    model.remain = model.capacity;
    if (req.session.role === '2') {
      model.teacher = ObjectID(req.session.user._id);
    } else {
      model.teacher = ObjectID(model.teacher._id);
    }
    // 判断时间冲突
    // 查找当前教师的所有课程
    db.find(collectionName, { teacher: model.teacher }).then(data => {
      const info = utils.checkTimeConflict(model, data);
      if (!info) {
        // 通过
        db.insertOne(collectionName, model).then(() => {
          res.send(utils.success('添加成功！'));
        });
      } else {
        // 冲突
        res.send(utils.failed(info));
      }
    });
  })
  .put((req, res) => {
    const model = Object.assign({}, req.body);
    // 保存`_id`信息后删除该属性，便于修改剩余所有的属性
    const id = model._id;
    delete model._id;
    model.capacity = parseInt(model.capacity);
	model.ocupied = parseInt(model.ocupied);
    model.remain = model.capacity - model.ocupied;
    if (req.session.role === '3') {
      model.teacher = ObjectID(model.teacher._id);
    }
    // 判断时间冲突
    // 查找当前教师的所有课程
    db.find(collectionName, { teacher: model.teacher }).then(data => {
      const info = utils.checkTimeConflict(model, data, id);
      if (!info) {
        // 通过
        db.updateOneByID(collectionName, id, model).then(() => {
          res.send(utils.success('修改成功！'));
        });
      } else {
        // 冲突
        res.send(utils.failed(info));
      }
    });
  });

// 注册的路由路径不同，需要单独注册
router.delete('/:id', (req, res) => {
  db.deleteOneByID(collectionName, req.params.id).then(() => {
    res.send(utils.success('删除成功！'));
  });
});

module.exports = router;
