import $ from 'jquery';
import 'bootstrap';
import { getCourses } from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  // 表格内容区域对应的jquery对象
  var tbody = $('tbody');

  // 获取课程数据后的回调
  function getCoursesCallback(data) {
    // 请求成功先清空之前的数据，在插入新的数据信息
    tbody.empty();
    var str = '';
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
      </tr>
      `;
    }
    tbody.append(str);
  }

  getCourses(getCoursesCallback);
});
