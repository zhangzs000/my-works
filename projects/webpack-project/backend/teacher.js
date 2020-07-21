// const express = require('express');
// const utils = require('./utils');
// const router = express.Router();
// const db = require('./db/mongo');
// const collectionName = 'teacher';

// router
//   .route('/')
//   .get((req, res) => {
//     let query = {};
//     let key = req.query.key;
//     if (key) {
//       query = {
//         $or: [{ code: { $regex: key } }, { name: { $regex: key } }]
//       };
//     }
//     db.find(collectionName, query, 'code').then(data => {
//       res.send(utils.success(data));
//     });
//   })
//   .post((req, res) => {
//     const model = {
//       code: req.body.code,
//       name: req.body.name,
//       password: '123456',
//       createTime: new Date()
//     };
//     utils.checkUnique(
//       res,
//       collectionName,
//       { code: model.code },
//       '工号不能重复',
//       () => {
//         db.insertOne(collectionName, model).then(() => {
//           res.send(utils.success('添加成功！'));
//         });
//       }
//     );
//   })
//   .put((req, res) => {
//     const model = req.body;
//     const id = model._id;
//     delete model._id;
//     utils.checkUnique(
//       res,
//       collectionName,
//       { code: model.code },
//       '工号不能重复',
//       () => {
//         db.updateOneByID(collectionName, id, model).then(() => {
//           res.send(utils.success('修改成功！'));
//         });
//       }
//     );
//   });

// router.delete('/:id', (req, res) => {
//   db.deleteOneByID(collectionName, req.params.id).then(() => {
//     res.send(utils.success('删除成功！'));
//   });
// });

// module.exports = router;
const express = require('express');
const utils = require('./utils');
const router = express.Router();
const db = require('./db/mongo');
const consts = require('./const');
const collectionName = consts.TEACHER;
const courseColName = consts.COURSE;

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
    db.find(collectionName, query, 'code').then(data => {
      res.send(utils.success(data));
    });
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
      '工号不能重复',
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
      '工号不能重复',
      () => {
        db.updateOneByID(collectionName, id, model).then(() => {
          res.send(utils.success('修改成功！'));
        });
        // const session = db.getSession();
        // session.startTransaction();
        // // 更新teacher数据
        // let updateTeacher = db.updateOneByID(collectionName, id, model);
        // // 更新course数据
        // let updateCourse = db.updateMany(
        //   courseColName,
        //   { 'teacher._id': id },
        //   { teacher: model }
        // );
        // Promise.all([updateTeacher, updateCourse]).then(() => {
        //   // 提交事务
        //   session.commitTransaction();
        //   res.send(utils.success('修改成功！'));
        // });
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

module.exports = router;

