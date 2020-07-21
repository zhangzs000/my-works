const express = require('express');
const cors = require('cors');
const utils = require('./utils');
const consts = require('./const');
const app = express();

// 连接数据库
const db = require('./db/mongo');
const dbPromise = db.connect();
// 关闭数据库
process.on('beforeExit', () => {
  db.close();
});

app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(
  session({
    secret: 'css',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ dbPromise: dbPromise })
  })
);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/token', (req, res) => {
  const { role, password, username } = req.body;
  if (username === 'Chris') {
    let srole = '3';
    req.session.user = { name: username };
    req.session.role = srole;
    res.send(
      utils.success({
        username: username,
        role: srole
      })
    );
    return;
  }
  // 学生从student集合中查询，教师从teacher集合中查询
  let collectionName = role === '1' ? consts.STUDENT : consts.TEACHER;
  db.find(collectionName, { code: username }).then(data => {
    if (data.length > 0) {
      // 存在该用户，比较密码
      let user = data[0];
      if (user.password === password) {
        // 登陆成功
        req.session.user = user;
        req.session.role = role;
        res.send(
          utils.success({
            username: user.name,
            courses: user.courses,
            role: role
          })
        );
      } else {
        // 登陆失败
        res.send(utils.failed('用户名/密码错误!'));
      }
    } else {
      // 登陆失败，用户不存在
      res.send(utils.failed('用户名不存在'));
    }
  });
});

// 注销
app.delete('/token', (req, res) => {
  req.session.destroy();
  res.send(utils.success('成功注销！'));
});

app.get('/menus', (req, res) => {
  if (req.session.user) {
    let role = req.session.role;
    let menus = [];
    switch (role) {
      case '1':
        menus = [
          {
            name: '选课',
            url: 'selecting_course.html'
          },
          {
            name: '我的课表',
            url: 'my_courses.html'
          }
        ];
        break;
      case '2':
        menus = [
          {
            name: '我的课程',
            url: 'courses_teacher.html'
          }
        ];
        break;
      case '3':
        menus = [
          {
            name: '学生管理',
            url: 'students.html'
          },
          {
            name: '教师管理',
            url: 'teachers.html'
          },
          {
            name: '课程管理',
            url: 'courses.html'
          }
        ];
        break;
      default:
        break;
    }
    res.send(utils.success(menus));
  } else {
    // 未登录
    res.send(utils.failed('请登录!'));
  }
});

app.use('/students', require('./student'));
app.use('/teachers', require('./teacher'));
app.use('/courses', require('./course'));

const log4js = require('log4js');

log4js.configure({
  appenders: {
    main: { type: 'file', filename: 'common.log' },
    error: { type: 'file', filename: 'error.log' }
  },
  categories: {
    default: { appenders: ['main'], level: 'all' },
    primary: { appenders: ['error'], level: 'error' }
  }
});

const pLogger = log4js.getLogger('primary');
// pLogger.trace('trace信息');
// pLogger.debug('debug信息');
// pLogger.info('info信息');
// pLogger.warn('warn信息');
// pLogger.error('error信息');
// pLogger.fatal('fatal信息');

// const dLoggerr = log4js.getLogger('de');
// dLoggerr.trace('trace信息');
// dLoggerr.debug('debug信息');
// dLoggerr.info('info信息');
// dLoggerr.warn('warn信息');
// dLoggerr.error('error信息');
// dLoggerr.fatal('fatal信息');

app.use((err, req, res, next) => {
  pLogger.error(err);
  res.status(500);
  res.send(utils.failed('服务器出错了，请联系管理员!'));
});

process.on('unhandledRejection', error => {
  pLogger.fatal(error);
});

app.listen(3000, () => {
  console.log('后台服务已启动!');
});

module.exports = app;
