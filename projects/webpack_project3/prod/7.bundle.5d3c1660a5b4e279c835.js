(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{195:function(t,n,e){"use strict";e.r(n);var s=e(11),a=e.n(s),o=e(3),u=e(4),i=e(6),r={mixins:[],props:{},components:a()({},i.Button.name,i.Button),computed:{},data:function(){return{params:{page:1,scanType:3,userId:u.a.user.get().userId,insId:u.a.user.get().insId}}},methods:{getData:function(){o.a.course_list(this.params,{isToast:!1}).then(function(t){console.log("getData: ",t)})}},watch:{},created:function(){},mounted:function(){this.getData()},render:function(t){}},c=e(8),p=Object(c.a)(r,function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"p-mycourse-deatail"},[n("el-button",{attrs:{type:"primary"}},[this._v("管理员页面")])],1)},[],!1,null,null,null);n.default=p.exports}}]);