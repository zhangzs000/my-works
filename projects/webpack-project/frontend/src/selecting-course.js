import $ from 'jquery';
import 'bootstrap';
import { alertInfo } from './global';
import { getCourses, selectCourse, dropCourse } from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  // 表格内容区域对应的jquery对象
  var tbody = $('tbody');
  // 当前等待删除的数据ID
  var currentID;

  // 获取课程数据后的回调
  function getCoursesCallback(data) {
    // 请求成功先清空之前的数据，在插入新的数据信息
    tbody.empty();
    var str = '';
    var user = JSON.parse(localStorage.getItem('user'));
    var selectedCourses = user.courses;
    for (let i = 0; i < data.length; i++) {
      const course = data[i];
      var timeStr = '';
      course.timeList.forEach(function(element) {
        timeStr += `${element.date} ${element.time}<br>`;
      });
      str += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${course.name}</td>
        <td>${timeStr}</td>
        <td>${course.teacher.name}</td>
        <td>${course.capacity}</td>
        <td>${course.ocupied}</td>
        <td>${course.remain}</td>
        <td>`;
      var selected = selectedCourses.some(value => {
        return value === course._id;
      });
      if (selected) {
        // 已选
        str += '<span class="mr-4">已选</span>';
      } else {
        // 未选
        str += `
        <a class="select-course mr-4" href="javascript:void(0)" 
          data-id="${course._id}">选课</a>`;
      }
      str += `
          <a data-toggle="modal" data-id="${course._id}" 
            data-teacher="${course.teacher.name}" data-name="${course.name}"
            data-target="#deletePanel" href="javascript:void(0)">退课</a>
        </td>
      </tr>
      `;
    }
    tbody.append(str);
    tbody.find('.select-course').on('click', function() {
      var that = $(this);
      selectCourse(
        $(this).data('id'),
        function(data) {
          alertInfo('.container-fluid', '选课成功!', 'success');
          user.courses = data;
          localStorage.setItem('user', JSON.stringify(user));
          getCourses(getCoursesCallback);
        },
        function(info) {
          alertInfo('.container-fluid', info, 'error');
        }
      );
    });
  }

  getCourses(getCoursesCallback);

  // 监听删除窗口打开事件
  $('#deletePanel').on('show.bs.modal', function(event) {
    var target = $(event.relatedTarget);
    currentID = target.data('id');
    var teacher = target.data('teacher');
    var name = target.data('name');
    var info = `确认退选'${teacher}'的《${name}》吗？`;
    $('.modal-body').html(info);
  });

  // 删除信息
  $('#deleteModel').on('click', function() {
    dropCourse(currentID, function(data) {
      alertInfo('.container-fluid', '退课成功', 'success');
      var user = JSON.parse(localStorage.getItem('user'));
      user.courses = data;
      localStorage.setItem('user', JSON.stringify(user));
      $('#deletePanel').modal('hide');
      getCourses(getCoursesCallback);
    });
  });

  // 关键字查询
  $('#search').on('click', function() {
    getCourses(getCoursesCallback, $('#keyInput').val());
  });
});
