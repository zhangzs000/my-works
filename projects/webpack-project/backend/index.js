const express = require('express');
const cors = require('cors');
const app = express();
const utils = require('./utils');
const consts = require('./const');

// 连接数据库
const db = require('./db/mongo');
// 
const dbPromise = db.connect();

// 关闭数据库，进程结束前关闭资源
process.on('beforeExit', () => {
  db.close();
});

// 使用中间件第三方包
app.use(cors());

// // 中间件的使用
// app.use((req, res, next)=>{
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// })

const session = require('express-session');
// 将session存储再数据库中,用数据库管理session
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

// app.post('/token', (req, res) => {
//   res.send(
//     utils.success({
//       username: 'admin',
//       role: 0
//     })
//   );
// });

app.post('/token', (req, res) => {
  // console.log('token: ',req)
  const { role, password, username } = req.body;
  if (username === 'Chris') {
    let srole = '3';
    // 设置session
    req.session.user = { name: username };
    req.session.role = srole;
    
    res.send(
      utils.success({
        username: username,
        role: srole
      })
    );
    // res.send后会继续执行
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
        // user.courses || [];
        let courses = user.courses ? user.courses : [];
        res.send(
          utils.success({
            username: user.name,
            courses: courses,
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
  // console.log('req.session: ',req.session)
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
  // res.send(
  //   utils.success([
  //     {
  //       name: '学生管理',
  //       url: 'students.html'
  //     },
  //     {
  //       name: '教师管理',
  //       url: 'teachers.html'
  //     },
  //     {
  //       name: '课程管理',
  //       url: 'courses.html'
  //     },
  //     {
  //       name: '我的课程',
  //       url: 'courses_teacher.html'
  //     },
  //     {
  //       name: '选课',
  //       url: 'selecting_course.html'
  //     },
  //     {
  //       name: '我的课表',
  //       url: 'my_courses.html'
  //     }
  //   ])
  // );
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
// 不想给前台用户一堆错误，可以捕获异常，但是错误要记录下来，用日志记录
app.use((err, req, res, next) => {
  pLogger.error(err);
  res.status(500);
  res.send(utils.failed('服务器出错了，请联系管理员!'));
});

// node程序崩溃掉的日志，对应catch
process.on('unhandledRejection', error => {
  // fatal,特别严重的问题。
  pLogger.fatal(error);
});

const http = require('http');
const socketIO = require('socket.io');

// 用来处理请求的是express,app是express实例
const server = http.Server(app);
// 通过服务器建立的通信
const io = socketIO(server);

const socketMap = {};

// 完全链接之后
io.on('connection', socket => {
  // console.log(socket, '已连接');

  // socket.on('zhang', data=>{
  //   console.log('收到zhang的消息: ',data)
  // })
  // // 保存socket
  socket.on('init', username => {
    // 每个人对应一个socket
    socketMap[username] = socket;
  });
  // 接受消息
  socket.on('msg', data => {
    const target = socketMap[data.target];
    console.log('target: ',target)
    if (target) {
      target.emit('msg', data.msg);
    }
  });
});
// app.get('/menus/:role', (req, res)=>{
//   res.send(
//     utils.success([
//       {
//         name: '选课',
//         url: 'selecting_course.html'
//       },
//       {
//         name: '我的课表',
//         url: 'my_courses.html'
//       },
//       {
//         name: '学生管理',
//         url: 'students.html'
//       }
//     ])
//   )
  // if (req.session.user) {
  //   let role = req.session.role;
  //   let menus = [];
  //   switch (role) {
  //     case '1':
  //       menus = [
  //         {
  //           name: '选课',
  //           url: 'selecting_course.html'
  //         },
  //         {
  //           name: '我的课表',
  //           url: 'my_courses.html'
  //         }
  //       ];
  //       break;
  //     case '2':
  //       menus = [
  //         {
  //           name: '我的课程',
  //           url: 'courses_teacher.html'
  //         }
  //       ];
  //       break;
  //     case '3':
  //       menus = [
  //         {
  //           name: '学生管理',
  //           url: 'students.html'
  //         },
  //         {
  //           name: '教师管理',
  //           url: 'teachers.html'
  //         },
  //         {
  //           name: '课程管理',
  //           url: 'courses.html'
  //         }
  //       ];
  //       break;
  //     default:
  //       break;
  //   }
  //   res.send(utils.success(menus));
  // } else {
  //   // 未登录
  //   res.send(utils.failed('请登录!'));
  // }
// })

server.listen(3000, ()=>{
  console.log('express启动')
})