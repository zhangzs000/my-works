const express = require('express');
const utils = require('./utils');
const router = express.Router();
const db = require('./db/mongo');
const consts = require('./const');
const collectionName = consts.STUDENT;
const ObjectID = require('mongodb').ObjectID;

router
  .route('/')
  .get((req, res) => {
    // 默认查询条件
    let query = {};
    // 关键字查询条件
    let key = req.query.key;
    if (key) {
      query = {
        // 查询`code`或`name`字段内包含关键字的数据
        $or: [{ code: { $regex: key } }, { name: { $regex: key } }]
      };
    }
    // 查询数据，并按照`code`排序
    const paginationModel = {
      pageIndex: parseInt(req.query.pageIndex),
      pageSize: parseInt(req.query.pageSize)
    };
    db.findPaginationData(collectionName, query, paginationModel, 'code').then(
      data => {
        res.send(utils.success(data));
      }
    );
  })
  .post((req, res) => {
    // 根据输入信息创建模型对象，设置默认密码和创建时间
    const model = {
      code: req.body.code,
      name: req.body.name,
      password: '123456',
      createTime: new Date()
    };
    // 检查数据库中是否存在重复的`code`信息
    utils.checkUnique(
      res,
      collectionName,
      { code: model.code },
      '学号不能重复',
      () => {
        db.insertOne(collectionName, model).then(() => {
          res.send(utils.success('添加成功！'));
        });
      }
    );
  })
  .put((req, res) => {
    const model = Object.assign({}, req.body);
    // 保存`_id`信息后删除该属性，便于修改剩余所有的属性
    const id = model._id;
    delete model._id;
    // 检查数据库中是否存在重复的`code`信息，当前记录除外(需要传入`targetID`参数)
    utils.checkUnique(
      res,
      collectionName,
      { code: model.code },
      '学号不能重复',
      () => {
        db.updateOneByID(collectionName, id, model).then(() => {
          res.send(utils.success('修改成功！'));
        });
      },
      id
    );
  });

// 注册的路由路径不同，需要单独注册
router.delete('/:id', (req, res) => {
  db.deleteOneByID(collectionName, req.params.id).then(() => {
    res.send(utils.success('删除成功！'));
  });
});

// 选课
router.post('/courses/:id', (req, res) => {
  const user = req.session.user;
  const courseID = req.params.id;
  let courses = user.courses ? user.courses : [];
  const courseIDList = courses.concat(courseID).map(value => {
    return ObjectID(value);
  });
  // 判断时间冲突
  // 查找当前学生的所有已选课程
  db.find(consts.COURSE, { _id: { $in: courseIDList } }).then(data => {
    let model = data.find(value => {
      return value._id.toString() === courseID;
    });
    const info = utils.checkTimeConflict(model, data, model._id.toString());
    if (!info) {
      // 通过
      courses.push(courseID);
      // 更新user上的选课信息
      user.courses = courses;
      // 更新student的courses信息
      db.updateOneByID(collectionName, user._id, { courses: courses }).then(
        () => {
          res.send(utils.success(courses));
        }
      );
    } else {
      // 冲突
      res.send(utils.failed(info));
    }
  });
});

// 退课
router.delete('/courses/:id', (req, res) => {
  const user = req.session.user;
  const courseID = req.params.id;
  let courses = user.courses ? user.courses : [];
  const index = courses.findIndex(value => {
    return value === courseID;
  });
  courses.splice(index, 1);
  // 更新user上的选课信息
  user.courses = courses;
  // 更新student的courses信息
  db.updateOneByID(collectionName, user._id, { courses: courses }).then(() => {
    res.send(utils.success(courses));
  });
});

module.exports = router;
