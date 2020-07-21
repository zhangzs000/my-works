import demand_paused from 'assets/images/demand_paused.png';
import demand_play from 'assets/images/demand_play.png';
import demand_on from 'assets/images/demand_on.png';
import demand_off from 'assets/images/demand_off.png';
import trackerMethod from './videoTracker.js'

class Video {
  constructor(vid, trackerParams) {
    var _this = this;
    this.timer = null;
    this._trackerParams = trackerParams;
    this.vid = document.getElementById(vid);
    this.btn_play = document.getElementById("btn_play");
    this.curtime = document.getElementById("curtime");
    this.sumtime = document.getElementById("sumtime");
    //进度条
    this.processbar = document.getElementById("processbar");
    this.dot = document.getElementById("dot");
    this.probg = document.getElementById("probg");
    //音量
    this.btn_voice = document.getElementById("btn_voice");
    this.voicebar = document.getElementById("voicebar");
    this.voicedot = document.getElementById("voicedot");
    this.voicebg = document.getElementById("voicebg");
    this.trackerVideo = {
      'data-pad': '',
      'data-up1': '',
      'data-pp1': trackerParams.courseId,
      'data-pp2': trackerParams.courseLessonLiveId,
    };
    
    // // 触发对象可以是任何元素或其他事件目标
    // elem.dispatchEvent(event);

    this.btn_play.onclick=function() {
      if (_this.vid.paused) {
        _this.vid.play();
        _this.trackerDataOpt('aw617')
        
        // this.value="暂停";
        this.style.backgroundImage = 'url('+demand_paused+')';
        _this.timer = setInterval(function(){
          _this.curTime()
        },30);
        
        // _this.sumTime();
      } else {
        _this.vid.pause();
        _this.trackerDataOpt('aw618')
        // this.value="播放";
        this.style.backgroundImage = 'url('+demand_play+')'
        clearInterval(_this.timer);
      }
                    
    }
    this.dot.onmousedown=function(e) {
        var e = e || window.event;
        var x = e.clientX-this.offsetLeft;
        _this.trackerDataOpt('aw618')
        document.onmousemove=function(e) {
          var e = e || event;
          var _left = e.clientX-x;
          if (_left<0) {
            _left=0;
          }
          if (_left>_this.processbar.offsetWidth-_this.dot.offsetWidth) {
            
            _left=_this.processbar.offsetWidth-_this.dot.offsetWidth;
          }
          _this.dot.style.left = _left+"px";
          _this.probg.style.width = 10+_left+"px";
          var m = _left/(_this.processbar.offsetWidth-_this.dot.offsetWidth);
          _this.vid.currentTime=m*_this.vid.duration;
        }
        document.onmouseup=function() {
          _this.trackerDataOpt('aw617')
          document.onmousemove = null;
          document.onmousedown = null;
          document.onmouseup = null;
        }
    }
    //音量控制
    this.btn_voice.onclick=function() {
      if (_this.vid.muted) {
        _this.vid.muted=false;
        this.value="音量";
        // this.style.backgroundImage = 'url('+demand_on+')';
      } else {
        _this.vid.muted=true;
        this.value="静音";
        // this.style.backgroundImage = 'url('+demand_off+')';
      }
                    
    }
    this.voicedot.onmousedown=function(e) {
        var e = e || window.event;

        var x = e.clientX-this.offsetLeft;
        
        document.onmousemove=function(e) {
          var e = e || event;
          
          var _left = e.clientX-x;
          if (_left<0) {
            _left=0;
          }
          if (_left>_this.voicebar.offsetWidth-_this.voicedot.offsetWidth) {
            _left=_this.voicebar.offsetWidth-_this.voicedot.offsetWidth;
          }
          _this.voicedot.style.left = _left+"px";
          _this.voicebg.style.width = 10+_left+"px";
          var m = _left/(_this.voicebar.offsetWidth-_this.voicedot.offsetWidth);	
          _this.vid.volume=m;
        }
        document.onmouseup=function() {
          document.onmousemove = null;
          document.onmousedown = null;
        }
    }
    // debugger
    this.vid.oncanplaythrough=function(){
      _this.sumTime() 
    }

    window.onbeforeunload=function(e){   
      // 用edge浏览器，并且必须return才会看到
      _this.trackerDataOpt('aw619')
    } 
    trackerMethod.initResource();

  }

  trackerDataOpt(status) {
    let _this = this,
    statusMap= {'aw617': 'play', 'aw618': 'pause', 'aw619': 'ended'},
    up1 = {
          "status": statusMap[status],
          "courseId": _this._trackerParams.courseId,
          "courseLessonLiveId": _this._trackerParams.courseLessonLiveId,
          "videotType": 0,
          "currentTime": _this.vid.currentTime,
          "duration": _this.vid.duration || 0,
          "url": _this._trackerParams.url
        }
        _this.trackerVideo['data-pad'] = status;
        _this.trackerVideo['data-up1'] = JSON.stringify(up1)

    trackerMethod.sendTracker(_this.trackerVideo)
    
  }

  curTime() {
    this.curtime.value=this.formatTime(Math.floor(this.vid.currentTime));
    this.dot.style.left = this.getScale()*(this.processbar.offsetWidth-this.dot.offsetWidth)+"px";
    this.probg.style.width=10+this.getScale()*(this.processbar.offsetWidth-this.dot.offsetWidth)+"px";
    if (Math.floor(this.vid.currentTime) === Math.floor(this.vid.duration)) {
      this.trackerDataOpt('aw619')
      clearInterval(this.timer)
    }
  }

  sumTime() {
    // let _this = this;
    // 还是挺奇怪的，初始加载点击了，没效果;换成polying
    // this.vid.addEventListener('canplaythrough',function(){
      this.sumtime.value = this.formatTime(Math.floor(this.vid.duration));
    // })
       
  }

  formatTime(num) {
    var _num = parseInt(num);
    var _hour=this.preZero(Math.floor(_num/3600));
    var _min =this.preZero(Math.floor(_num%3600/60));
    var _sec = this.preZero(Math.floor(_num%60));
    return _hour+":"+_min+":"+_sec;
  }

  preZero(time) {
    if(time<10){
      return "0"+time;
    }else{
      return time;
    }
  }

  getScale() {
    return this.vid.currentTime/this.vid.duration;
  }

  setScale() {
    return null;
  }
}
/**
 html
 <video id="player" :src="videoUrl" class="video-player" name="media" ref="myvideo">
            您的浏览器不支持此种视频格式。
        </video>
        <div class="tools" ref="mytools">
            <input type="button" value="" id="btn_play"></input>
            <span class="time-tool">
                <input type="text" value="00:00:00" id="curtime" readonly="true">
                <span style="color: #fff">/</span>
                <input type="text" value="00:00:00" id="sumtime" disabled="true">
            </span>
            <div id="processbar">
                <div id="dot"></div>
                <div id="probg"></div>
            </div>	
            <br/>
            <input type="button" value="音量" id="btn_voice"></input>
            <div id="voicebar">
                <div id="voicedot"></div>
                <div id="voicebg"></div>
            </div>
	    </div>
 */
/**
 样式
 .tools{
		position: fixed;
        bottom: 0;
        left: 0px;
        width: 100%;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.2);
        input[type=button]{
            background-color: rgba(0, 0, 0, 0.2);
            color:#fff;
        }
        .time-tool {
            position: absolute;
            height: 14px;
            left: 60px;
            top: 18px;
            input[type=text]{
                width: 72px;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.2);
                border:none;
                text-align: center;
                position: relative;
            }
            
        }
        
        #btn_play {
            display: inline-block;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 5px;
            left: 5px;
            border-radius: 40px;
            background-size: cover;
            color: #fff;
            cursor: pointer;
        }
        #btn_voice{
            position: absolute;
            right: 335px;
            top: 14px;
            width: 38px;
            height: 19px;
            border-radius: 5px;
            font-size: 12px;
            border:#fff solid 1px;
            cursor: pointer;
        }
        #processbar{
            position: absolute;
            top: -10px;
            width: 100%;
            height: 10px;
            border-radius: 10px;
            background:#fff; 
        }
        #voicebar{
            width: 300px;
            height: 5px;
            border-radius: 10px;
            position: absolute;
            right: 20px;
            top: 21px;
            background: #fff;
        }
        #dot,#voicedot{
            width: 10px;
            height: 10px;
            background: #ff6e0b;
            border-radius: 10px;
            position: absolute;
            z-index: 2;
            cursor: pointer;
        }
        #voicedot{
            top: -2px;
            left: 290px;
        }
        #probg{
            background: #ccc;
            width: 300px;
            height: 10px;
            border-radius: 10px;
            position: absolute;
            
        }
        #voicebg{
            background: #ccc;
            width: 300px;
            height: 5px;
            border-radius: 10px;
            position: absolute;
            
        }
	}
 */
/*
tracker.js
import { common } from 'utils'


const videoTrackerEvent = document.createEvent('Event'); 
videoTrackerEvent.initEvent('click', true, true); 
const trackerDom = document.getElementById('maidian_page');
const trackerDomAjax = document.getElementsByClassName('maidian_ajax_page')[0];

const trackerMethod = {

  initResource() {  
    
    common.insertTagToDocument(window, document, 'script', '//resource.aixuexi.com/alilog.v2.js')
      
  },

  sendTracker(params) {
    for(let key in params) {
      trackerDom.setAttribute(key, params[key]);
      trackerDomAjax.setAttribute(key, params[key])
    }

    trackerDomAjax && trackerDomAjax.dispatchEvent(videoTrackerEvent)
    trackerDomAjax.addEventListener('click',function(e){
      console.log('trackerDom: ',trackerDomAjax)
    })
      
  }
}

export default trackerMethod;
*/
 export default Video;
