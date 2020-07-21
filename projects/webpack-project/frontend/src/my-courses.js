import $ from 'jquery';
import 'bootstrap';
import { getCourseDayIndex, getCourseTimeIndex } from './global';
import { getStudentCourses } from './requests';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/timetable.css';

$(document).ready(function() {
  // 获取课程数据后的回调
  function getCoursesCallback(data) {
    // 7列13行的二维数组
    let timeTable = new Array(7);
    for (let i = 0; i < timeTable.length; i++) {
      timeTable[i] = new Array(13);
      timeTable[i].fill(-1);
    }
    // 遍历已选课程的所有时间段，转化为二维数组内的值
    for (let i = 0; i < data.length; i++) {
      const course = data[i];
      for (let j = 0; j < course.timeList.length; j++) {
        const timeModel = course.timeList[j];
        // timeModel.date timeModel.time => timeTable
        let indexModel = {
          // 星期几 的索引
          dayIndex: getCourseDayIndex(timeModel.date),
          // 第几节课 的索引
          timeIndex: getCourseTimeIndex(timeModel.time)
        };
        course.indexModel = indexModel;
        for (const value of indexModel.timeIndex) {
          timeTable[indexModel.dayIndex][value] = i;
        }
      }
    }
    console.log(timeTable);
    // 生成dom
    var str = `
    <div class="tt-column">
      <div class="tt-cell">课表</div>
      <div class="tt-cell">1</div>
      <div class="tt-cell">2</div>
      <div class="tt-cell">3</div>
      <div class="tt-cell">4</div>
      <div class="tt-cell">5</div>
      <div class="tt-cell">6</div>
      <div class="tt-cell">7</div>
      <div class="tt-cell">8</div>
      <div class="tt-cell">9</div>
      <div class="tt-cell">10</div>
      <div class="tt-cell">11</div>
      <div class="tt-cell">12</div>
      <div class="tt-cell">13</div>
    </div>
    `;
    let currentCourseIndex = -2;
    for (let i = 0; i < timeTable.length; i++) {
      const column = timeTable[i];
      // 创建表头
      str += `
      <div class="tt-column">
        <div class="tt-cell">${DAY_IN_WEEK[i]}</div>
      `;
      for (let j = 0; j < column.length; j++) {
        const cell = column[j];
        if (currentCourseIndex === cell) {
          continue;
        }
        if (cell === -1) {
          // 空白
          str += '<div class="tt-cell"></div>';
        } else {
          // 有课
          currentCourseIndex = cell;
          const course = data[cell];
          const spanLength = course.indexModel.timeIndex.length;
          str += `
          <div class="tt-cell tt-flex-${spanLength}">
            ${course.name}
          </div>
          `;
        }
      }
      str += '</div>';
    }
    $('.tt-container').html(str);
  }

  getStudentCourses(getCoursesCallback);
});

const DAY_IN_WEEK = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
];
