<!--
  我的作业编辑
  @author yongge@gaosiedu.com 2017-05-08
-->
<template>
  <div class="p-homeworkDetail-Wrap">
    <mt-header title="我的答案" class="">
      <router-link to slot="left">
        <mt-button icon="back" @click="goBack()">返回</mt-button>
      </router-link>
      <div slot="right">
        <mt-button @click="submitHomework()" class="p-editHomework-btn-submit">提交</mt-button>
      </div>
	  </mt-header>
    <div class="edit-homework">
      <div class="edit-text-area-container">
        <textarea class="edit-text-area" v-model="homeworkContent.content" autofocus rows="10" cols="30" placeholder=" 请输入您的作业答案...">
        </textarea>
      </div>
      <div class="edit-img-list">
        <!-- input主体-->
        <input ref="inputer" type="file" id="inputId" :accept="inputSet.accept" class="edit-img-inputer" :multiple="inputSet.multiple" @change="handleFileChange"
        />
          <div class="edit-img-cell edit-img-common edit-img-margin" :style="{width: imgSize, height: imgSize}" v-for="(item, key) in homeworkContent.imageUrls">
            <transition name="fade">
              <div class="edit-img-transition" :style="{width: imgSize, height: imgSize}" @click="showFullImg(key)" v-loading="homeworkImgNum[key]"> 
                <div class="edit-img-del" @click.stop="delateImg(key)">
                  <div class="edit-img-del-template">+</div>
                </div>
                <img ref="img" :src="item" @error="" class="edit-img-common" >
              </div>
            </transition>
          </div>
        <label class="edit-img-plus edit-img-common edit-img-margin" id="qiniu-up" :style="{width: imgSize, height: imgSize}" for="inputId" v-if="imgListLength">
          +
        </label>
      </div>
    </div>
    <div class="edit-img-swiper .fade" v-if="swiperSetting.showSwiper" @click="hideFullImg()">
      <mt-swipe :defaultIndex="swiperSetting.showIndex" :continuous="false" :auto="0">
        <mt-swipe-item v-for="item in homeworkContent.imageUrls"><span></span><img class="edit-img" :src="item" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
  
</template>

<script>

import S from 'service';
import NAPI from 'nadaptor';
import pageHeader from '../comp/page-header';
import { Loading } from 'element-ui';
import { Swipe, SwipeItem, Header, Button, MessageBox } from 'mint-ui';
// import Qiniu from 'qiniu-js'
export default {
  
  mixins: [],

  props: {
    // 需要提交的作业内容
    homeworkContentProp: {
      type: Object,
      default: {
        type: 0,
        content: '',
        imageUrls: [],
        isEditImage: 0,
        userHomeworkId: 0,
      }
    },
    homeworkMessage: {
      type: Object,
      default: {
      }
    },
    homeworkImgNum: {
      type: Array,
      default: []
    }
  },
  
  components: {
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe,
    [Button.name]: Button,
    [Header.name]: Header,
    [Loading.name]: Loading,
    pageHeader
  },

  computed: {
    sizeHumanRead() {
      let rst = 0;
      if (this.inputSet.maxSize < 1024) {
        rst = this.inputSet.maxSize + 'K'
      } else {
        rst = (this.inputSet.maxSize / 1024).toFixed(this.inputSet.maxSize % 1024 > 0 ? 2 : 0) + 'M'
      }
      return rst
    },
    imgSize() {
      return `${this.inputSet.size}px`
    },
    imgListLength() {
      let imgLength = this.homeworkContent.imageUrls.length
      if (imgLength > 9) {
        return false
      }
      else {
        return true
      }
    },
    submitHomeworkParmas() {
      let homeworkContentParmas = {
        type: 0,
        content: '',
        imageUrls: [],
        isEditImage: 0,
        userHomeworkId: 0
      }
      let imageUrls = ''
      homeworkContentParmas = Object.assign({}, this.homeworkContent)
      this.homeworkContent.imageUrls.forEach(item => {
        imageUrls += `${item};`
      })
      homeworkContentParmas.imageUrls = imageUrls;
      return homeworkContentParmas
    },
    sumSubJudge () {
      let sum = 0
      this.homeworkImgNum.forEach((item) => {
        sum += item
      })
      return sum
    }
  },

  data () {
    return {
      pageTitleInfo: {
        'title': "我的答案",
        'rightbtn': true
      },
      //页面的标题信息
      inputSet: {
        accept: 'image/jpg,image/jpeg,image/png,image/bmp',
        maxSize: 102400,
        fileName: '',
        multiple: 9,
        size: 0
      },
      //图片大小警告文本
      errText: '',
      //获取到的图片的base64
      arrImgBase64: [],
      // 需要提交的作业内容
      homeworkContent: this.homeworkContentProp,
      // 是否展示swiper 
      swiperSetting: {
        showSwiper: false,
        showIndex: 0
      },
    };
  },

  methods: {
    goBack() {
      this.$emit('return', false)
    },
    handleFileChange (e, FILE) {
      let inputDOM = this.$refs.inputer;
      this.file = FILE || inputDOM.files;
      //console.log(typeof this.file)
      // 类数组处理，将每张图片转化为base64,请求
      if (Array.prototype.slice.call(this.file).length + this.homeworkContent.imageUrls.length > 9) {
        MessageBox.alert("作业最多传9张图片");
        return false;
      }
      Array.prototype.slice.call(this.file).forEach((item, key) => {
        this.dealWithSingalImg(item, key)
      })
    },

    // 对每个图像进行处理
    dealWithSingalImg (file, key) {
      // debugger
      let sizeMillion = Math.floor(file.size / 1024)
      if (sizeMillion > this.inputSet.maxSize) {
        this.errText = `图片大小不能超过${this.sizeHumanRead}`
        return false
      }
      Promise.all([
        this.getBase64(file),
        this.serviceQiniuToken()
      ])
      .then(([base64, tokenInfo]) => {
        return this.uploadQiniu(base64, tokenInfo)
      })
      .then(([url, length]) => {
        this.homeworkContent.imageUrls.splice(length, 1, url)
        if (url) {
          //圖片編輯过
          this.homeworkContent.isEditImage = 1;
        }
        // 七牛的url返回之后去掉loading
        this.homeworkImgNum.splice(length, 1, 0)
        // this.dataUrl = getImageByUrl(url)  
      })
    },

    // 得到头像后生成base64 并用canvas 进行压缩
    getBase64(file) {
      var Orientation = null;
      let self = this;
      EXIF.getData(file, function() {  
           // alert(EXIF.pretty(this));  
            EXIF.getAllTags(this);   
            //alert(EXIF.getTag(this, 'Orientation'));   
            Orientation = EXIF.getTag(this, 'Orientation');  
        }); 
      return new Promise((resolve) => {
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          // 出现loading
          this.homeworkImgNum.push(1)
          let reader = new FileReader()
          reader.readAsDataURL(file);
          reader.onload = function () {
            let image = new Image()
            image.src = this.result
            let canvas = document.createElement("canvas")
            let ctx = canvas.getContext('2d')
            image.onload = function () {
              let w = image.width,
              h = image.height
              canvas.width = w
              canvas.height = h
              ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h)
              // if (navigator.userAgent.match(/iphone/i)) {  
                // console.log('iphone');  
                //alert(expectWidth + ',' + expectHeight);  
                //如果方向角不为1，都需要进行旋转 added by lzk  
                if(Orientation != "" && Orientation != 1){  
                  switch(Orientation){  
                    case 6://需要顺时针（向左）90度旋转  
                      // alert('需要顺时针（向左）90度旋转');  
                      self.rotateImg(image,'left',canvas);  
                      break;  
                    case 8://需要逆时针（向右）90度旋转  
                      // alert('需要顺时针（向右）90度旋转');  
                      self.rotateImg(image,'right',canvas);  
                      break;  
                    case 3://需要180度旋转  
                      // alert('需要180度旋转');  
                      self.rotateImg(image,'right',canvas);//转两次  
                      self.rotateImg(image,'right',canvas);  
                      break;  
                  }         
                }  
                // base64 = canvas.toDataURL("image/jpeg", 0.8);  
              // }
              let img64 = canvas.toDataURL("image/jpeg", 0.2)
              ctx.clearRect(0, 0, w, h);
              ctx = null
              resolve(img64)
            }
          }
        }
      })
    },

    // 将base64上传到七牛
    uploadQiniu(picBase, data) {
      return new Promise((resolve) => {
        let self = this
        this.homeworkContent.imageUrls.push(picBase)
        let imageUrlsLength = this.homeworkContent.imageUrls.length-1
        /*picUrl用来存储返回来的url*/
        /*把头部的data:image/png;base64,去掉。（注意：base64后面的逗号也去掉）*/
        picBase = picBase.split(',')[1]
        let url = "http://up.qiniu.com/putb64/" + this.fileSize(picBase);
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            let keyText = xhr.responseText;
            /*返回的key是字符串，需要装换成json*/
            keyText = JSON.parse(keyText)
            // picUrl = "http://ojvh6i96g.bkt.clouddn.com/" + keyText.key;
            let url = data.url + keyText.key
            resolve([url, imageUrlsLength])
          }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Authorization", "UpToken " + data.token);
        // 上传七牛
        xhr.send(picBase);
      })
    },
    //对图片旋转处理 added by lzk  
    rotateImg (img, direction,canvas) {  
          // alert(444)
          //alert(img);  
          //最小与最大旋转方向，图片旋转4次后回到原方向    
          var min_step = 0;    
          var max_step = 3;    
          //var img = document.getElementById(pid);    
          if (img == null)return;    
          //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
          var height = img.height;    
          var width = img.width;    
          //var step = img.getAttribute('step');    
          var step = 2;    
          if (step == null) {    
              step = min_step;    
          }    
          if (direction == 'right') {    
              step++;    
              //旋转到原位置，即超过最大值    
              step > max_step && (step = min_step);    
          } else {    
              step--;    
              step < min_step && (step = max_step);    
          }    
          //img.setAttribute('step', step);    
          /*var canvas = document.getElementById('pic_' + pid);   
          if (canvas == null) {   
              img.style.display = 'none';   
              canvas = document.createElement('canvas');   
              canvas.setAttribute('id', 'pic_' + pid);   
              img.parentNode.appendChild(canvas);   
          }  */  
          //旋转角度以弧度值为参数    
          var degree = step * 90 * Math.PI / 180;    
          var ctx = canvas.getContext('2d');    
          switch (step) {    
              case 0:    
                  canvas.width = width;    
                  canvas.height = height;    
                  ctx.drawImage(img, 0, 0);    
                  break;    
              case 1:    
                  canvas.width = height;    
                  canvas.height = width;    
                  ctx.rotate(degree);    
                  ctx.drawImage(img, 0, -height);    
                  break;    
              case 2:    
                  canvas.width = width;    
                  canvas.height = height;    
                  ctx.rotate(degree);    
                  ctx.drawImage(img, -width, -height);    
                  break;    
              case 3:    
                  canvas.width = height;    
                  canvas.height = width;    
                  ctx.rotate(degree);    
                  ctx.drawImage(img, -width, 0);    
                  break;    
          }    
      },

    //请求服务端上传七牛的token,key
    serviceQiniuToken() {
      return S.get_token(Object.assign({
      }))
    },

    /* 通过base64编码字符流计算文件流大小函数 */
    fileSize(str) {
      let fileSize;
      if (str.indexOf('=') > 0) {
        let indexOf = str.indexOf('=')
        str = str.substring(0, indexOf)//把末尾的’=‘号去掉
      }

      fileSize = parseInt(str.length - (str.length / 8) * 2);
      return fileSize;
    },

    // 删除图片
    delateImg (key) {
      if (this.homeworkImgNum[key]) {
        MessageBox.alert("图片上传中...", "提示");
        return false
      }
      // console.log('homeworkImgNum: ',this.homeworkImgNum)
      // console.log('homeworkContent: ',this.homeworkContent.imageUrls);
      // console.log('key: ',key+': '+this.homeworkContent.imageUrls[key]);
      // this.serviceQiniuToken().then((data) => {
      //   console.log('token: ',data.token)
      //   this.deleteQiNiu(data.token, this.homeworkContent.imageUrls[key]);
      // })
      //圖片編輯过
      this.homeworkContent.isEditImage = 1;
      this.homeworkContent.imageUrls.splice(key, 1)
      this.homeworkImgNum.splice(key, 1)
  
    },
    // 删除七牛图片
    deleteQiNiu (token, entryURI) {
        let _host = 'http://rs.qiniu.com/delete/';
        //指定接口
        let _entryURI = entryURI.replace(/com\//g,'com:').replace(/http:\/\//g,'');
        let encodedEntryURI = this.urlsafe_base64_encode(_entryURI);
        let url = _host + encodedEntryURI+'=';
        console.log('url: ',url)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("删除成功！")
          }
          if (xhr.status == 612) {
            console.log('待删除资源不存在!');
          }
          if(xhr.status) {
            console.log('status: ',xhr.status)
          }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "QBox " + token);
        xhr.send();
    },

    //展示swiper图片
    showFullImg(key) {
      this.swiperSetting.showSwiper = true
      this.swiperSetting.showIndex = key
    },

    // 隐藏swiper
    hideFullImg() {
      this.swiperSetting.showSwiper = false      
    },
    /**获取屏幕宽度 来根据分辨率展示不同大小 */
    getScreenHeight() {
      let screenHeight = window.screen.width;
      let imgListSize = parseInt((screenHeight - 58) / 4)
      this.inputSet.size = imgListSize
      // console.log(screenHeight,'screenHeight')
    },

    /**提交作业 */
    submitHomework() {
      if (this.sumSubJudge > 0) {
        MessageBox.alert("图片上传中,不能提交", "提示");
        return false
      } else if (!this.submitHomeworkParmas.content) {
        MessageBox.alert("作业内容不能为空", "提示")
        return false
      } else {
        MessageBox({
          title: '提示',
          message: '确认提交？',
          showCancelButton: true
        }).then((action) => {
          if (action === 'cancel') {
            return false
          } else {
            
          }
          S.save_home_work(
            Object.assign(this.submitHomeworkParmas, this.homeworkMessage),
            {isToast: false}
          ).then((data) => {
            setTimeout(() => {
              this.$emit('return', false)
            },1000)
             
          }) 
          .catch(error => {
              this.$emit('return', false);
              MessageBox.alert("您已经提交过此作业！", "提示")
          })
        })
      }
    }
  },

  watch: {
    
  },

  created () {

  },

  mounted () {
    this.getScreenHeight()
  },

  render (h) {

  }
}

</script>


<style lang="less" scoped>
.p-homeworkDetail-Wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
header {
  &.mint-header {
    height: 50px;
    background-color: #fff;
    color: inherit;
    border-bottom: 1px solid #dcdcdc;
    position: fixed;
    width: 100%;
    z-index: 10;
  }
}
img {
  border: none;
}
.edit-homework {
  padding: 55px 5px 5px 5px;

}
.edit-text-area-container {
  .edit-text-area {
    resize: none;
    width: 100%;
    height: 3rem;
    font-size: 16px;
  }
  textarea:focus {
    text-shadow:0px 0px 0px green;
  }
}
.edit-img-list {
  position: relative;
  .edit-img-inputer {
    position: absolute;
    left: -9999px;
  }
  .edit-img-common {
    float: left;
    width: 100%;
    height: 100%;
  }
  .edit-img-margin {
    margin: 0.1rem;
  }
  .edit-img-cell {
    /**删除或者读取图片时候 加动画 */
    .edit-img-transition {

    }
    border: 1px solid #dcdcdc;
    position: relative;
    overflow: hidden;
    .edit-img-del {
      position: absolute;
      width: 0.84rem;
      height: 0.84rem;
      right: -0.42rem;
      top: -0.42rem;
      border-radius: 0.42rem;
      background: rgba(0, 0, 0, 0.5);
      .edit-img-del-template {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 60%;
        height: 60%;
        text-align: center;
        color: #c5c2c0;
        font-size: 0.46rem;
        transform:rotate(45deg);
      }
    }
    img {
      border: none;
    }
  }
  .edit-img-plus {
    background: #eeeeee;
    border: 1px dashed #dcdcdc;
    color: #d2d2d2;
    text-align: center;
    font-size: 1.2rem;
    vertical-align: middle;
  }
}
/**滑动图片 swiper插件 */
.edit-img-swiper {
  top: 0;
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  vertical-align:middle;
  span{
        height:100%;
        display:inline-block;
        vertical-align:middle;
    }
  .edit-img {
    vertical-align: middle;
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: .15s cubic-bezier(0.4, 0.0, 0.2, 1);
    will-change: transform;
  }
  &-enter,
  &-leave-active {
    opacity: 0;
    transform: translateX(30%);
  }
}
.m-homework-edit {
  margin-top: 50px;
}
</style>
<style>
  .el-loading-mask {
    z-index: 10
  }
 .p-homeworkDetail-Wrap .p-editHomework-btn-submit {
    color: rgb(18, 165, 25);
  }
</style>