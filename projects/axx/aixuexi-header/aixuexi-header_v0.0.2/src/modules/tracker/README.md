## 统计说明
> 新项目中增加统计的方式

### html标签的方式

```
<div class="maidian_ajax_page" data-pad="aw601"></div>
```

优点: 简洁
风险点: 不适合多层嵌套的标签, 如
```
<a class="maidian_ajax_page" data-pad="aw601">
  <span>name</span>
</a>
```
如果是触发span标签的点击事件, 会冒泡到a.maidian_ajax_page 上, 但是触发到document.body.onclick 事件里的event.target不准确, 除非做event.path 进行遍历处理, 统计js不确定是否会做准确处理

### vuex方式

```javascript
页面有router， 且跟routes中无关的地方
this.$store.dispatch('TRACKER_CHANGE', { pad: 'aw601' })

如果是非单页面（页面无router） 需要加 ready的统计, 需要在mounted时候, 加入TRACKER_READY
this.$store.dispatch('TRACKER_READY', { pad: 'aw601' })
```


