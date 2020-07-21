import $ from 'jquery';
import './main.css';
// import imgsrc from './assets/test.png'; // 需要loader
// import clist from './countries'
// import frenchChance from './random';

import Router from './router';
import Track from './track';
import Share from './share';
import App from './App';

$('#startButton').on('click', async () => {
  let spans = $('span');
  for (const span of spans) {
    span.style.backgroundColor = 'inherit';
  }
  let champion;

  const clist = await import (
    /* webpackChunkName: 'random' */
    './countries');
  const frenchChance = await import(
    /* webpackChunkName: 'countries'*/
    './random');

  if (frenchChance.default()) {
    champion = clist.default[0];
  } else {
    champion = clist.default[1];
  }
  $('#'+champion).css('backgroundColor', 'blue');
});
$('#btn').on('click',function(){
  $.ajax({
    method: 'GET',
    url: '/token/aa',
    success: function(res){
      if(res.success) {
        console.log('res.success: ',res.success)
      }
    }
  });
})
$('#btn1').on('click',function(){
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    url: '/token/bb',
    data: JSON.stringify({
        username: 'zhang',
        password: '123',
        role: 'rrrr'
    }),
    success: function(res){
      if(res.success) {
        console.log('res.success: ',res.success)
      }
    }
  });
})
$('#btn2').on('click',function(){
  $.ajax({
    method: 'PUT',
    contentType: 'application/json',
    url: '/token/cc',
    data: JSON.stringify({
        username: 'zhang',
        password: '123',
        role: 'rrrr'
    }),
    success: function(res){
      if(res.success) {
        console.log('res.success: ',res.success)
      }
    }
  });
})
$('#btn3').on('click',function(){
  $.ajax({
    method: 'DELETE',
    contentType: 'application/json',
    url: '/token/dd',
    data: JSON.stringify({
        username: 'zhang',
        password: '123',
        role: 'rrrr'
    }),
    success: function(res){
      if(res.success) {
        console.log('res.success: ',res.success)
      }
    }
  });
})

// document.getElementById('testImg').src=imgsrc;
// new App({
//     onReady() {
//         // do something here...
//         console.log('do something here...')
//     },
// });

// new App({
//   router: new Router(),
//   track: new Track(),
//   onReady() {
//       // do something here...
//       console.log('do something here...')
//   },
// });

App.use([Router, Track, Share]);

new App({
  router: {
      mode: 'history',
  },
  track: {
      // ...
  },
  share: {
    
  },
  onReady(app) {
    app.setShare({
        title: 'Hello IoC.',
        description: 'description here...',
        // some other data here...
    });
  }
});