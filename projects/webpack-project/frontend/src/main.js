// import $ from 'jquery';
// import 'bootstrap';
// import { FRONTEND_HOST, BACKEND_HOST } from './global';
// // import { getMenus, deleteToken } from './requests';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './css/dashboard.css';
// // import io from 'socket.io-client';

// $(document).ready(function() {

//   var user = localStorage.getItem('user');
//   var userModel = JSON.parse(user);

//   // 内容iframe的jquery对象
//   var iframe = $('#targetContainer');
//   // 设置iframe高度，等于窗口高度减去顶部操作栏高度
//   iframe.height(window.innerHeight - $('.navbar.navbar-dark').height());

//   $.getJSON(BACKEND_HOST + '/menus/'+ userModel.role, function(res) {
//     if(res.success) {
//       // console.log(res.data)
//       // 拼接菜单字符串
//       var str = '';
//       for (let i = 0; i < res.data.length; i++) {
//         const menu = res.data[i];
//         str += `
//             <li class="nav-item">
//               <a class="nav-link" href="javascript:void(0)" 
//               data-url="${menu.url}">
//                 ${menu.name}
//               </a>
//             </li>            
//           `;
//       }
//       // 将菜单节点添加到文档中
//       var nav = $('#menuNav');
//       nav.append(str);
//       // 监听菜单的点击事件
//       nav.on('click', 'a', function() {
//         var el = $(this);
//         var url = el.data('url');
//         // 切换激活效果
//         el.parent()
//           .parent()
//           .find('li .active')
//           .removeClass('active');
//         el.addClass('active');
//         // 将菜单对应的内容页面设置到iframe上
//         iframe.prop('src', FRONTEND_HOST + '/' + url);
//       });
//       // 激活第一个菜单
//       nav.find('li:first-child a').click();
//     }
//   });
//   // 注销
//   $('#logout').on('click', function() {
//     deleteToken(function() {
//       // 清空user信息
//       localStorage.removeItem('user');
//       // 跳转到登录页
//       location.href = FRONTEND_HOST + '/login.html';
//     });
//   });
// })
import $ from 'jquery';
import 'bootstrap';
import { FRONTEND_HOST } from './global';
import { getMenus, deleteToken } from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/dashboard.css';
import io from 'socket.io-client';

$(document).ready(function() {
  // 设置当前用户名称
  var user = localStorage.getItem('user');
  if (user) {
    var userModel = JSON.parse(user);
    $('#username').html(userModel.username);
    // 建立socket连接
    const socket = io('http://localhost:3000');
    // socket.emit('zhang','aaaaa')
    // 链接上之后就发送消息
    socket.on('connect', () => {
      // 连接上之后马上发送消息
      socket.emit('init', userModel.username);
    });

    // 点击按钮触发该事件
    socket.emit('msg', {
      target: 'Chris',
      msg: `你好，我是${userModel.username}`
    });
    // 接受消息
    socket.on('msg', msg => {
      console.log('socket-msg: ',msg);
    });
    
  } else {
    // 跳转到登录页
    location.href = FRONTEND_HOST + '/login.html';
  }
  // 内容iframe的jquery对象
  var iframe = $('#targetContainer');
  // 设置iframe高度，等于窗口高度减去顶部操作栏高度
  iframe.height(window.innerHeight - $('.navbar.navbar-dark').height());

  getMenus(function(data) {
    // 拼接菜单字符串
    var str = '';
    for (let i = 0; i < data.length; i++) {
      const menu = data[i];
      str += `
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" 
            data-url="${menu.url}">
              ${menu.name}
            </a>
          </li>            
        `;
    }
    // 将菜单节点添加到文档中
    var nav = $('#menuNav');
    nav.append(str);
    // 监听菜单的点击事件
    nav.on('click', 'a', function() {
      var el = $(this);
      var url = el.data('url');
      // 切换激活效果
      el.parent()
        .parent()
        .find('li .active')
        .removeClass('active');
      el.addClass('active');
      // 将菜单对应的内容页面设置到iframe上
      iframe.prop('src', FRONTEND_HOST + '/' + url);
    });
    // 激活第一个菜单
    nav.find('li:first-child a').click();
  });

  // 注销
  $('#logout').on('click', function() {
    deleteToken(function() {
      // 清空user信息
      localStorage.removeItem('user');
      // 跳转到登录页
      location.href = FRONTEND_HOST + '/login.html';
    });
  });
});
