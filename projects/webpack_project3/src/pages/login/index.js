/**
 * 开发人员登录页
 */

import login from 'common/modules/login'
import entry from 'entry'
import $ from 'jquery';
import * as apis from './apis';
export default entry(
  login,
  {
    // setLocation () {
    //   if (!$common.isPc) {
    //     location.href = urls.mobile
    //     return false
    //   }
    // }
  }, 
  {
    apis,
    store: null,
    RouteConfig: {
      routes: null
    }
  })
import 'lodash';
import S from "service";

setTimeout(()=>{

  var objects = [{ 'a': 1 }, { 'b': 2 }];
 
  var deep = _.cloneDeep(objects);
  console.log(deep[0] === objects[0]);


// console.log('NAPI.user.get(): ',NAPI.user.get())
// console.log('S: ',S)
// get
$('#btn1').on('click',()=>{
  S.T3({
    data: JSON.stringify({
      username: 'zhang',
      password: '123',
      role: 'rrrr'
    }),
  },{
    isToast: false,
    beforeSend: function(){
      console.log('before send')
    }
  }).then(data => {
    console.log('get: ',data)
  });
})
})

// post
$('#btn2').on('click',()=>{
  S.T4({
    data: JSON.stringify({
      username: 'zhang',
      password: '123',
      role: 'rrrr'
    }),
  },{
    isToast: false,
    beforeSend:function(){
      console.log('beforeSend: ',[...arguments])
    },
    afterSend: function(){
      console.log('afterSend: ',[...arguments])
    }
  }).then(data => {
    console.log('post: ',data)
  });
})

// delete
$('#btn3').on('click',()=>{
  S.T5({
    data: JSON.stringify({
      username: 'zhang',
      password: '123',
      role: 'rrrr'
    }),
  },{isToast: false}).then(data => {
    console.log('delete: ',data)
  });
})

// put
$('#btn4').on('click',()=>{
  S.T6({
    data: JSON.stringify({
      username: 'zhang',
      password: '123',
      role: 'rrrr'
  }),
  },{isToast: false}).then(data => {
    console.log('put: ',data)
  });
})