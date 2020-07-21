import $ from 'jquery';
import 'bootstrap';
import {
  alertInfo,
  createCourseDateOptions,
  createCourseTimeOptions,
  createTeacherOptions,
  createScheduleDiv
} from './global';
import {
  getTeachers,
  getCourses,
  createCourse,
  unpdateCourse,
  deleteCourse
} from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  var admin = JSON.parse(localStorage.getItem('user')).role === '3';
  // 表格内容区域对应的jquery对象
  var tbody = $('tbody');
  // 课程数据
  var courses;
  // 当前状态，`add`表示新增，`modify`表示修改
  var type;
  // 当前等待删除的数据ID
  var currentID;
  // 模型表单
  var form = $('form').get(0);
  // 模型面板
  var modelPanel = $('#modelPanel');
  // 上课日期下拉框
  var courseDateSelect = $('#courseDate');
  // 上课时间下拉框
  var courseTimeSelect = $('#courseTime');
  // 任课教师下拉框
  var teacherSelect = $('#teacherName');
  // 教师数据
  var teachers;
  // 一周上几天课
  var scheduleNum;

  // 获取课程数据后的回调
  function getCoursesCallback(data) {
    // 请求成功先清空之前的数据，在插入新的数据信息
    tbody.empty();
    var str = '';
    courses = data;
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
      `;
      if (admin) {
        str += `<td>${course.teacher.name}</td>`;
      }
      str +=`
        <td>${course.capacity}</td>
        <td>${course.ocupied}</td>
        <td>${course.remain}</td>
        <td>
          <a class="edit mr-4" href="javascript:void(0)" data-id="${course._id}"
            data-type="modify" data-toggle="modal" data-target="#modelPanel">编辑</a>
          <a class="delete" data-toggle="modal" data-id="${course._id}"
            data-target="#deletePanel" href="javascript:void(0)">删除</a>
        </td>
      </tr>
      `;
    }
    tbody.append(str);
  }

  getCourses(getCoursesCallback);

  // 监听模型窗口打开事件
  modelPanel.on('show.bs.modal', function(event) {
    type = $(event.relatedTarget).data('type');
    var targetCourse;
    // 设置上课日期和时间下拉框
    courseDateSelect.html(createCourseDateOptions());
    courseTimeSelect.html(createCourseTimeOptions());
    // 默认一周一次课，讲多余的上课安排选项删除
    scheduleNum = 1;
    $(form)
      .find('.schedule')
      .remove();
    if (type === 'add') {
      $('#modelPanelLabel').html('添加课程信息');
      // 添加时清空信息
      $('#courseID').val('');
      $('#courseName').val('');
      courseDateSelect.val(courseDateSelect.children(':first-child').val());
      courseTimeSelect.val(courseTimeSelect.children(':first-child').val());
      $('#courseCapacity').val(100);
    } else {
      // 修改时设置信息
      $('#modelPanelLabel').html('修改课程信息');
      var id = $(event.relatedTarget).data('id');
      targetCourse = courses.find(function(course) {
        return course._id === id;
      });
      $('#courseID').val(targetCourse._id);
      $('#courseOcupied').val(targetCourse.ocupied);
      $('#courseName').val(targetCourse.name);
      $('#courseCapacity').val(targetCourse.capacity);
      // 根据上课时间设置下拉框数量
      var first = targetCourse.timeList[0];
      courseDateSelect.val(first.date);
      courseTimeSelect.val(first.time);
      var others = targetCourse.timeList.slice(1);
      if (others.length !== 0) {
        var target = $('#addSchedule')
          .parent()
          .parent();
        others.forEach(function(other, index) {
          var idIndex = index + 1;
          target.before(createScheduleDiv(idIndex));
          $(`#courseDate${idIndex}`).val(other.date);
          $(`#courseTime${idIndex}`).val(other.time);
        });
      }
    }
    if (admin) {
      // 获取教师数据
      getTeachers(function(data) {
        teachers = data;
        teacherSelect.html(createTeacherOptions(teachers));
        if (type === 'add') {
          teacherSelect.val(teacherSelect.children(':first-child').val());
        } else {
          teacherSelect.val(targetCourse.teacher._id);
        }
      });
    }
    // 还原字段检查状态
    form.classList.remove('was-validated');
  });

  // 监听模型窗口已打开事件
  modelPanel.on('shown.bs.modal', function(event) {
    // 第一个输入框聚焦
    $('#courseCode').focus();
  });

  $('#addSchedule').on('click', function() {
    $(this)
      .parent()
      .parent()
      .before(createScheduleDiv(scheduleNum));
  });

  // 保存信息
  $('#saveModel').on('click', function() {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    var course = {};
    course._id = $('#courseID').val();
    course.ocupied = $('#courseOcupied').val();
    course.name = $('#courseName').val();
    // 设置上课时间
    var timeList = [
      { date: courseDateSelect.val(), time: courseTimeSelect.val() }
    ];
    $(form)
      .find('.schedule')
      .each(function(index, element) {
        timeList.push({
          date: $(element)
            .find('.courseDate')
            .val(),
          time: $(element)
            .find('.courseTime')
            .val()
        });
      });
    course.timeList = timeList;
    if (admin) {
      // 设置课程模型上的`teacher`数据
      course.teacher = teachers.find(function(teacher) {
        return teacher._id === teacherSelect.val();
      });
    }
    course.capacity = parseInt($('#courseCapacity').val());
    if (type === 'add') {
      delete course._id;
      createCourse(
        course,
        function(data) {
          alertInfo('.container-fluid', data, 'success');
          modelPanel.modal('hide');
          getCourses(getCoursesCallback);
        },
        function(info) {
          alertInfo('form', info, 'error');
        }
      );
    } else {
      unpdateCourse(
        course,
        function(data) {
          alertInfo('.container-fluid', data, 'success');
          modelPanel.modal('hide');
          getCourses(getCoursesCallback);
        },
        function(info) {
          alertInfo('form', info, 'error');
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
    deleteCourse(currentID, function(data) {
      alertInfo('.container-fluid', data, 'success');
      $('#deletePanel').modal('hide');
      getCourses(getCoursesCallback);
    });
  });

  // 关键字查询
  $('#search').on('click', function() {
    getCourses(getCoursesCallback, $('#keyInput').val());
  });
});
