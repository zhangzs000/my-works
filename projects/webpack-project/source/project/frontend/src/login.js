import $ from 'jquery';
import 'bootstrap';
import { FRONTEND_HOST } from './global';
import { getToken } from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/signin.css';

$(document).ready(function() {
  // 监听表单提交
  $('#loginForm').submit(function(event) {
    // 还原效果
    $('#inputPassword').removeClass('is-invalid');
    $('.invalid-feedback').html('');
    // 阻止默认的提交行为
    event.preventDefault();
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    var role = $('input[name="role"]:checked').val();
    getToken(
      username,
      password,
      role,
      function(data) {
        // 登陆成功跳转到主界面
        location.href = FRONTEND_HOST + '/main.html';
        localStorage.setItem('user', JSON.stringify(data));
      },
      function(info) {
        $('#inputPassword').addClass('is-invalid');
        $('.invalid-feedback').html(info);
      }
    );
  });
});
