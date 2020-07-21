import $ from 'jquery';

export const PAGESIZE = 1;
// 后台服务地址
export const BACKEND_HOST = '/api';
// 前端项目发布地址
export const FRONTEND_HOST = location.protocol + '//' + location.host;
// 设置提示信息
export const alertInfo = (el, info, type, expire = 2000) => {
  var style = type === 'error' ? 'alert-danger' : 'alert-success';
  var str = `
  <div id="alert" class="alert ${style} fade show" role="alert">
    ${info}
  </div>
  `;
  $(el).prepend(str);
  setTimeout(() => {
    $('#alert').alert('close');
  }, expire);
};

// 处理ajax回调的函数
export const ajaxCallback = (success, failed) => {
  return result => {
    if (result.success) {
      success(result.data);
    } else {
      if (failed && typeof failed === 'function') {
        failed(result.info);
      }
    }
  };
};

// 上课日期
const COURSE_DATE = ['星期一', '星期二', '星期三', '星期四', '星期五'];

// 上课时间
const COURSE_TIMES = [
  '8:00~9:35',
  '9:50~11:25',
  '9:50~12:15',
  '13:15~14:50',
  '15:05~16:40',
  '15:05~17:30',
  '18:30~20:05',
  '18:30~20:55'
];

// 返回上课日期的下拉选项
export const createCourseDateOptions = () => {
  let str = '';
  for (let i = 0; i < COURSE_DATE.length; i++) {
    const date = COURSE_DATE[i];
    str += `<option value="${date}">${date}</option>`;
  }
  return str;
};

// 返回上课时间的下拉选项
export const createCourseTimeOptions = () => {
  let str = '';
  for (let i = 0; i < COURSE_TIMES.length; i++) {
    const time = COURSE_TIMES[i];
    str += `<option value="${time}">${time}</option>`;
  }
  return str;
};

// 返回上课时间的下拉选项
export const createTeacherOptions = teachers => {
  let str = '';
  for (let i = 0; i < teachers.length; i++) {
    const teacher = teachers[i];
    str += `<option value="${teacher._id}">${teacher.name}</option>`;
  }
  return str;
};

export const createScheduleDiv = i => {
  return `
  <div class="schedule form-group row">
    <label for="courseTime" class="col-sm-3 col-form-label col-form-label-sm">上课时间</label>
    <div class="col-sm-9">
      <select class="form-control courseDate form-control-sm" id="courseDate${i}" required>
      ${createCourseDateOptions()}
      </select>
      <select class="form-control courseTime form-control-sm" id="courseTime${i}" required>
      ${createCourseTimeOptions()}
      </select>
    </div>
  </div>
  `;
};
