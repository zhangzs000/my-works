import $ from 'jquery';
import { BACKEND_HOST, ajaxCallback, PAGESIZE } from './global';

// 登陆
export const getToken = (username, password, role, success, failed) => {
  post(
    BACKEND_HOST + '/token',
    {
      username: username,
      password: password,
      role: role
    },
    success,
    failed
  );
};

// 注销
export const deleteToken = (success, failed) => {
  remove(BACKEND_HOST + '/token', success, failed);
};

// 获取菜单数据
export const getMenus = (success, failed) => {
  get(BACKEND_HOST + '/menus', {}, success, failed);
};

// 获取学生信息
export const getStudents = (success, key = '', pageIndex = 0) => {
  var url = BACKEND_HOST + '/students';
  var params = {
    pageIndex: pageIndex,
    pageSize: PAGESIZE
  };
  if (key) {
    params.key = key;
  }
  get(url, params, success);
};

// 新增学生信息
export const createStudent = (code, name, success, failed) => {
  post(
    BACKEND_HOST + '/students',
    {
      code: code,
      name: name
    },
    success,
    failed
  );
};

// 修改学生信息
export const unpdateStudent = (id, code, name, success, failed) => {
  modify(
    BACKEND_HOST + '/students',
    {
      _id: id,
      code: code,
      name: name
    },
    success,
    failed
  );
};

// 删除学生信息
export const deleteStudent = (id, success, failed) => {
  remove(BACKEND_HOST + '/students/' + id, success, failed);
};

// 获取教师信息
export const getTeachers = (success, key = '') => {
  var url = BACKEND_HOST + '/teachers';
  if (key) {
    url += `?key=${key}`;
  }
  get(url, {}, success);
};

// 新增教师信息
export const createTeacher = (code, name, success, failed) => {
  post(
    BACKEND_HOST + '/teachers',
    {
      code: code,
      name: name
    },
    success,
    failed
  );
};

// 修改教师信息
export const unpdateTeacher = (id, code, name, success, failed) => {
  modify(
    BACKEND_HOST + '/teachers',
    {
      _id: id,
      code: code,
      name: name
    },
    success,
    failed
  );
};

// 删除教师信息
export const deleteTeacher = (id, success, failed) => {
  remove(BACKEND_HOST + '/teachers/' + id, success, failed);
};

// 获取课程信息
export const getCourses = (success, key = '') => {
  var url = BACKEND_HOST + '/courses';
  if (key) {
    url += `?key=${key}`;
  }
  get(url, {}, success);
};

// 新增课程信息
export const createCourse = (model, success, failed) => {
  post(BACKEND_HOST + '/courses', model, success, failed);
};

// 修改课程信息
export const unpdateCourse = (model, success, failed) => {
  modify(BACKEND_HOST + '/courses', model, success, failed);
};

// 删除课程信息
export const deleteCourse = (id, success, failed) => {
  remove(BACKEND_HOST + '/courses/' + id, success, failed);
};

// 选课
export const selectCourse = (id, success, failed) => {
  post(BACKEND_HOST + '/students/courses/' + id, {}, success, failed);
};

// 退课
export const dropCourse = (id, success, failed) => {
  remove(BACKEND_HOST + '/students/courses/' + id, success, failed);
};

// 获取学生的选课信息
export const getStudentCourses = (success, failed) => {
  get(BACKEND_HOST + '/students/courses', {}, success, failed);
};

function get(url, params, success, failed) {
  $.getJSON(url, params, ajaxCallback(success, failed));
}

function post(url, data, success, failed) {
  console.log('data： ',data, 'stringify: ',JSON.stringify(data))
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data),
    success: ajaxCallback(success, failed)
  });
}

function modify(url, data, success, failed) {
  $.ajax({
    method: 'PUT',
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: ajaxCallback(success, failed)
  });
}

function remove(url, success, failed) {
  $.ajax({
    method: 'DELETE',
    url: url,
    contentType: 'application/json',
    success: ajaxCallback(success, failed)
  });
}
