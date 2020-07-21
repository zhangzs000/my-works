import $ from 'jquery';
import 'bootstrap';
import { alertInfo, PAGESIZE } from './global';
import {
  getStudents,
  createStudent,
  unpdateStudent,
  deleteStudent
} from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  // 表格内容区域对应的jquery对象
  var tbody = $('tbody');
  // 学生数据
  var students;
  // 当前状态，`add`表示新增，`modify`表示修改
  var type;
  // 当前等待删除的数据ID
  var currentID;
  // 模型表单
  var form = $('form').get(0);
  // 模型面板
  var modelPanel = $('#modelPanel');
  // 分页
  var pagination = $('.pagination');
  // 当前页码索引
  var currentPage = 0;

  // 获取学生数据后的回调
  function getStudentsCallback(result) {
    // 请求成功先清空之前的数据，在插入新的数据信息
    tbody.empty();
    var str = '';
    var data = result.data;
    students = data;
    for (let i = 0; i < data.length; i++) {
      const student = data[i];
      str += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${student.code}</td>
        <td>${student.name}</td>
        <td>
          <a class="edit mr-4" href="javascript:void(0)" 
            data-id="${student._id}" data-type="modify" 
            data-toggle="modal" data-target="#modelPanel">编辑</a>
          <a class="delete" data-toggle="modal" data-id="${student._id}"
            data-target="#deletePanel" href="javascript:void(0)">删除</a>
        </td>
      </tr>
      `;
    }
    tbody.append(str);
    // 生成分页栏
    pagination.empty();
    var pages = '';
    pages += `
    <li class="page-item">
      <a class="page-link page-first" href="javacript:void(0)">&laquo;</a>
    </li>
    `;
    var count = result.count;
    var pageNum = Math.ceil(count / PAGESIZE);
    for (let i = 0; i < pageNum; i++) {
      pages += `
      <li class="page-item">
        <a class="page-link page-num" data-index="${i}" 
          href="javacript:void(0)">${i + 1}</a>
      </li>
      `;
    }
    pages += `
      <li class="page-item">
        <a class="page-link page-last" href="javacript:void(0)">&raquo;</a>
      </li>
    `;
    pagination.html(pages);
    var pageLis = pagination.find('.page-num');
    pageLis
      .eq(currentPage)
      .parent()
      .addClass('active');
    pageLis.on('click', function() {
      currentPage = $(this).data('index');
      getStudents(getStudentsCallback, $('#keyInput').val(), currentPage);
    });
    pagination.find('.page-first').on('click', function() {
      $(this)
        .parent()
        .next()
        .find('a')
        .click();
    });
    pagination.find('.page-last').on('click', function() {
      $(this)
        .parent()
        .prev()
        .find('a')
        .click();
    });
  }

  getStudents(getStudentsCallback);

  // 监听模型窗口打开事件
  modelPanel.on('show.bs.modal', function(event) {
    type = $(event.relatedTarget).data('type');
    if (type === 'add') {
      // 添加时清空信息
      $('#modelPanelLabel').html('添加学生信息');
      $('#studentID').val('');
      $('#studentCode').val('');
      $('#studentName').val('');
    } else {
      // 修改时设置信息
      $('#modelPanelLabel').html('修改学生信息');
      var id = $(event.relatedTarget).data('id');
      for (let i = 0; i < students.length; i++) {
        const student = students[i];
        if (id === student._id) {
          $('#studentID').val(student._id);
          $('#studentCode').val(student.code);
          $('#studentName').val(student.name);
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
    $('#studentCode').focus();
  });

  // 保存信息
  $('#saveModel').on('click', function() {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    var id = $('#studentID').val();
    var code = $('#studentCode').val();
    var name = $('#studentName').val();
    if (type === 'add') {
      createStudent(
        code,
        name,
        function(data) {
          alertInfo('.container-fluid', data, 'success');
          modelPanel.modal('hide');
          getStudents(getStudentsCallback, $('#keyInput').val());
        },
        function(info) {
          alertInfo('.container-fluid', info, 'error');
          modelPanel.modal('hide');
        }
      );
    } else {
      unpdateStudent(
        id,
        code,
        name,
        function(data) {
          alertInfo('.container-fluid', data, 'success');
          modelPanel.modal('hide');
          getStudents(getStudentsCallback, $('#keyInput').val());
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
    deleteStudent(
      currentID,
      function(data) {
        alertInfo('.container-fluid', data, 'success');
        $('#deletePanel').modal('hide');
        getStudents(getStudentsCallback, $('#keyInput').val());
      },
      function(info) {
        alertInfo('.container-fluid', info, 'error');
        modelPanel.modal('hide');
      }
    );
  });

  // 关键字查询
  $('#search').on('click', function() {
    getStudents(getStudentsCallback, $('#keyInput').val());
  });
});
