import $ from 'jquery';
import bootstrap from 'bootstrap';
import { BACKEND_HOST, FRONTEND_HOST } from './global';
// import { getToken } from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/signin.css';

$(document).ready(function(){
  // console.log(111111)
  $("#loginForm").submit(function(e){
    // alert(e)
    e.preventDefault();
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    var role = $('input[name="role"]:checked').val();
    // 只有 $.post 即使 JSON.stringify仍然是 Form data
    // jQuery中$.post默认的Content-type Header为application/x-www-form-urlencoded
    /*
      https://www.cnblogs.com/btgyoyo/p/6141480.html
      HTTP POST表单请求提交时，使用的Content-Type是application/x-www-form-urlencoded，
      而使用原生AJAX的POST请求如果不指定请求头RequestHeader，
      默认使用的Content-Type是text/plain;charset=UTF-8。
    */
    // $.post(BACKEND_HOST + '/token', JSON.stringify({
    //   username: username,
    //   password: password,
    //   role: role,
    // }), function(res){
    //   if(res.success) {
    //     location.href = FRONTEND_HOST + '/main.html';
    //     localStorage.setItem('user', JSON.stringify(res.data));
    //   }
    // })
    // 只有 $.ajax 中data JSON.stringify后才会Request Payload
    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      url: BACKEND_HOST + '/token',
      data: JSON.stringify({
          username: username,
          password: password,
          role: role,
      }),
      success: function(res){
        if(res.success) {
          location.href = FRONTEND_HOST + '/main.html';
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      }
    });
  })  
})
// import $ from 'jquery';
// import 'bootstrap';
// import { FRONTEND_HOST } from './global';
// import { getToken } from './requests';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './css/signin.css';

// $(document).ready(function() {
//   // 监听表单提交
//   $('#loginForm').submit(function(event) {
//     // 还原效果
//     $('#inputPassword').removeClass('is-invalid');
//     $('.invalid-feedback').html('');
//     // 阻止默认的提交行为
//     event.preventDefault();
//     var username = $('#inputUsername').val();
//     var password = $('#inputPassword').val();
//     var role = $('input[name="role"]:checked').val();
//     // 不然的话后台接受到的是一个空对象
//     getToken(
//       username,
//       password,
//       role,
//       function(data) {
//         // 登陆成功跳转到主界面
//         // location.href = FRONTEND_HOST + '/main.html';
//         localStorage.setItem('user', JSON.stringify(data));
//       },
//       function(info) {
//         $('#inputPassword').addClass('is-invalid');
//         $('.invalid-feedback').html(info);
//       }
//     );
//   });
// });
