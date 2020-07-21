import $ from 'jquery';
import 'bootstrap';
import { alertInfo } from './global';
import {
  getTeachers,
  createTeacher,
  unpdateTeacher,
  deleteTeacher
} from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  // 表格内容区域对应的jquery对象
  var tbody = $('tbody');
  // 教师数据
  var teachers;
  // 当前状态，`add`表示新增，`modify`表示修改
  var type;
  // 当前等待删除的数据ID
  var currentID;
  // 模型表单
  var form = $('form').get(0);
  // 模型面板
  var modelPanel = $('#modelPanel');

  // 获取教师数据后的回调
  function getTeachersCallback(data) {
    // 请求成功先清空之前的数据，在插入新的数据信息
    tbody.empty();
    var str = '';
    teachers = data;
    for (let i = 0; i < data.length; i++) {
      const teacher = data[i];
      str += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${teacher.code}</td>
        <td>${teacher.name}</td>
        <td>
          <a class="edit mr-4" href="javascript:void(0)" data-id="${
            teacher._id
          }"
            data-type="modify" data-toggle="modal" data-target="#modelPanel">编辑</a>
          <a class="delete" data-toggle="modal" data-id="${teacher._id}"
            data-target="#deletePanel" href="javascript:void(0)">删除</a>
        </td>
      </tr>
      `;
    }
    tbody.append(str);
  }

  getTeachers(getTeachersCallback);

  // 监听模型窗口打开事件
  modelPanel.on('show.bs.modal', function(event) {
    type = $(event.relatedTarget).data('type');
    if (type === 'add') {
      // 添加时清空信息
      $('#modelPanelLabel').html('添加教师信息');
      $('#teacherID').val('');
      $('#teacherCode').val('');
      $('#teacherName').val('');
    } else {
      // 修改时设置信息
      $('#modelPanelLabel').html('修改教师信息');
      var id = $(event.relatedTarget).data('id');
      for (let i = 0; i < teachers.length; i++) {
        const teacher = teachers[i];
        if (id === teacher._id) {
          $('#teacherID').val(teacher._id);
          $('#teacherCode').val(teacher.code);
          $('#teacherName').val(teacher.name);
          break;
        }
      }
    }
    // 还原字段检查状态
    form.classList.remove('was-validated');
  });

  // 监听模型窗口已打开事件
  modelPanel.on('shown.bs.modal', function(event) {
    // 第一个输入框聚焦
    $('#teacherCode').focus();
  });

  // 保存信息
  $('#saveModel').on('click', function() {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    var id = $('#teacherID').val();
    var code = $('#teacherCode').val();
    var name = $('#teacherName').val();
    if (type === 'add') {
      createTeacher(
        code,
        name,
        function(data) {
          alertInfo('.container-fluid', data, 'success');
          modelPanel.modal('hide');
          getTeachers(getTeachersCallback);
        },
        function(info) {
          alertInfo('.container-fluid', info, 'error');
          modelPanel.modal('hide');
        }
      );
    } else {
      unpdateTeacher(
        id,
        code,
        name,
        function(data) {
          alertInfo('.container-fluid', data, 'success');
          modelPanel.modal('hide');
          getTeachers(getTeachersCallback);
        },
        function(info) {
          alertInfo('.container-fluid', info, 'error');
          modelPanel.modal('hide');
        }
      );
    }
  });

  // 监听删除窗口打开事件
  $('#deletePanel').on('show.bs.modal', function(event) {
    currentID = $(event.relatedTarget).data('id');
  });

  // 删除信息
  $('#deleteModel').on('click', function() {
    deleteTeacher(
      currentID,
      function(data) {
        alertInfo('.container-fluid', data, 'success');
        $('#deletePanel').modal('hide');
        getTeachers(getTeachersCallback);
      },
      function(info) {
        alertInfo('.container-fluid', info, 'error');
        modelPanel.modal('hide');
      }
    );
  });

  // 关键字查询
  $('#search').on('click', function() {
    getTeachers(getTeachersCallback, $('#keyInput').val());
  });
});
