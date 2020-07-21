<!--
  爱学习上传组建
  zhangzesheng@gaosiedu.com 20180601
-->
<!--
  接口同elementUI的upload
  兼容到 
  "element-ui": "1.2.4";
  "vue": "2.1.6"
  Easy Sample:
  <upload
    :uploadProps="uploadProps"
    :onChange="handleChange"
    :file-list="fileList"
    :onRemove="handleRemove"
    //imageUrl="xxx" // 肖像特有,图片回显地址
    //:show-file-list="false" // 肖像特有
    >
  </upload>
data() {
  return {
    uploadProps:
          { model:{
              ext: {
                label: '上传测试',
                layout: 'inline',
                params: {businessKey: 'TRAIN'},
                accept: ".mp4,.png",
                maxSize: 7,
                maxFiles: 3,
                listType: 'picture-card', // 照片墙类型
                listTypeTips: 'xxx', // 照片墙类型的中间文本提示
                // className: "avatar-uploader", // 肖像特有
                tips: '支持mp4格式上传，最大上传2048M'
              }
            }
          },
        fileList:[{...},{...}]
  }
}
  
  注释：
  label: 标题，
  maxFiles: 文件个数，
  accept  @type String 接受文件类型
  maxSize @type number 接受文件大小
  tips    @type String 提示
  WHcontrol.control @type Object 对上传文件的限制
  multiple @Boolean 允许多选

  // 由于element版本和时间原因暂不支持以下
  limit: limit
  multiple: true // 不知何时清空before的临时数组，多个文件只能成功一个
-->
<template>
  <div class="axx-upload">
    <el-upload
      :class="uploadProps.className"
      :show-file-list="showFileList"
      :action="postURL"
      :file-list="myFileList"
      :disabled="disabled"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :multiple='false'
      :data="postData" 
      :before-upload="handleBeforeUpload"
      :on-change="handleOnChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :list-type="uploadProps.listType"
      :accept="uploadProps.accept"
      :limit="uploadProps.limit"
      >
      <div v-if="uploadProps.className!=='upload-demo'">
        <img v-if="myImageUrl" :src="myImageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-if="uploadProps.className==='upload-demo' && uploadProps.listType !== 'picture-card'" style="text-align: left;">
        <el-button size="small" type="primary">{{uploadProps.label}}</el-button>
        <div slot="tip" class="el-upload__tip">{{uploadProps.tips}}</div>
      </div>
        <i v-if="uploadProps.listType === 'picture-card'" class="el-icon-plus"></i>
        <span v-if="uploadProps.listType === 'picture-card' && uploadProps.listTypeTips" class="list-type-tips">{{uploadProps.listTypeTips}}</span>
    </el-upload>
    <div v-show="previewVisible" @click="_toggleModal">	
      <div v-if="previewFileType  == 'img'" class="modal-container">
        <img class="modal-container-ele"  :src="previewImage" />
      </div>
      <div v-if="previewFileType  == 'video'" class="modal-container">
        <video class="modal-container-ele" :src="previewImage" />
      </div>
    </div>
  </div>
</template>

<script>
import { Upload, Button, Icon, MessageBox } from 'element-ui';
import Toast from 'service/comp/toast';
let toast = new Toast();

export default {
  
  mixins: [],

  props: {
    fileList: {
      type: Array,
      default: function () {
        return []
      }
    },
    uploadProps: {
      type: Object,
      default: {}
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    // 肖像
    imageUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function
    },
    onRemove: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onError: {
      type: Function
    }
  },
  
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button,
    [MessageBox.name]: MessageBox,
    [Icon.name]: Icon
  },

  computed: {
    
  },

  data () {

    return {
      // 默认的登陆token，@type: string
      loginToken: 'token',
      AXX_ACTION_STORAGE: {
        UploadUrl: "//storage.aixuexi.com/component/uploadInfo"
      },
      // 上传需要的参数
      postData: {
        token: '', 
        key: '', 
        policy: '',
        OSSAccessKeyId: '',
        callback: '',
        signature: ''
      },
      // 上传路径
      postURL: '',
      // 已上传文件的个数
      upLoadNum: 0,
      //用于预览得视频格式检测
      allVideo: [
        "flv", "swf", "mkv", "avi", "rm", "rmvb", "mpeg", "mpg",
        "ogg", "ogv", "mov", "wmv", "mp4", "webm", "mp3", "wav", "mid"],
			//用于预览得图片格式检测
      allImage: ["png", "jpg", "jpeg", "gif", "bmp"],
      // 预览相关
      previewImage: '',
      previewVisible: false,
      previewFileType: '',
      myImageUrl: this.imageUrl,
      myFileList: this.fileList
    }
  },

  methods: {
    handlePreview(file) {
       //检测视频格式
        const isVideo = this.allVideo.some((item) => {
          return file.name.split('.').pop().toLowerCase() == item
        })

        //检测图片格式
        const isImage = this.allImage.some((item) => {
          return file.name.split('.').pop().toLowerCase() == item
        })

        //设定当前预览文件格式
        if(isVideo) {
          var previewFileType = 'video'
          var previewVisible = true
        }else if(isImage) {
          var previewFileType = 'img'
          var previewVisible = true
        }else{
          var previewFileType = 'otherType'
          var previewVisible = false
        }

        if(previewFileType == 'otherType') {
          this.$message.warning('当前预览文件非图片或视频')
          location.href = (file.url || file.thumbUrl)
          return
        }
        this.previewImage=file.url || file.thumbUrl;
        this.previewVisible = previewVisible;
        this.previewFileType = previewFileType;
    },
    handleRemove(file, fileList){
      fileList = fileList.filter(item=> !/^(blob:).*/.test(item.url))
      this.myFileList = fileList
      // 这个有用,移除时fileList并未真实移除，导致下次增加多出一条
      this.upLoadNum = fileList.length
      // 格式化file
      const batchFormat = this._myBatch(this._formatFile);
      file = batchFormat(file.name, file);

      this.onRemove && this.onRemove(file, fileList);
    },
    handleExceed() {
      //onexceed={this.handleExceed}
    },
    handleProgress() {
      // onProgress={this.handleProgress}???
    },
    async handleBeforeUpload(file) {
      const {
        model:
          {
            ext: { listType, multiple, accept, maxFiles, maxSize, params: { businessKey, token_oss }, WHcontrol }
          }
      } = this.uploadProps

      const that = this
      //判断图片尺寸是否限制
      if(WHcontrol && WHcontrol.control) {
        let flag = await new Promise(function (resolve, reject) {
          // 这个应该不是异步吧
          that._createReader(file, WHcontrol.width, WHcontrol.height, resolve, WHcontrol.Proportion)
        })

        //flag是返回的图片尺寸是否允许上传
        if(!flag){
          if(WHcontrol.errorMessage) {
            this.$message.error(WHcontrol.errorMessage)
          }else{
            this.$message.error('文件尺寸不符合，建议宽为' + WHcontrol.width + 'px高为' + WHcontrol.height + 'px')
          }
          await new Promise(function (resolve, reject) {
            return 
          })
        }
      }

      //检测当前文件格式是否上传受限
      const isJPG = accept.split(',').some((item) => {
        return file.name.split('.').pop().toLowerCase() == item.replace(/^\./,'')
      })

      //检测文件大小
      const isLt2M = file.size / 1024 / 1024 < (maxSize - 0)

      if (!isJPG) {
        this.$message.error('此文件类型不允许上传')
        this._hideIsReadyFile()
        await new Promise(function (resolve, reject) {
          return 
        }) 
      }

      
      if (!isLt2M) {
        toast.show({ message: '图片过大，请选择'+ maxSize +'MB以下的图片上传！', position: 'bottom', duration: 1000 });
        // this.$message.error('文件大小不能超过'+ maxSize +'M!')
        this._hideIsReadyFile()
        await new Promise(function (resolve, reject) {
          return 
        })
      }
      //检测文件个数是否受限
      if( this.upLoadNum >= maxFiles - 0 ){
        this.$message.error('最多上传'+ maxFiles +'个文件')
        this._hideIsReadyFile()
        await new Promise(function (resolve, reject) {
          return 
        })
      }

      try {
        // 获取上传相关信息
       return new Promise(function (resolve, reject) {
          that._ajaxRequest({
            url: that.AXX_ACTION_STORAGE.UploadUrl,
            type: "GET",
            data: {
                businessKey: businessKey,
                originalFileName: file.name
              }
          }, resolve, reject)
        }).then(data => {
          
            var res = JSON.parse(data)
            //图片上传唯一标识,在服务器的唯一表示
            var storageKey = res.body.key
            //七牛参数设置 
            if (res.body.bucketType === "QINIU") { 

              let token = res.body.qiniuSignature;

              this.$nextTick(()=>{
                this.postURL = 'https://upload.qiniup.com';
              })
              
              this.postData = {
                key: storageKey,
                token: token
              };
               
            } else {//阿里
            
              var aliInfo = res.body.aliyunSignature;

              this.$nextTick(()=>{
                this.postURL = aliInfo.host;
              })

              this.postData = {
                key: storageKey,
                policy: aliInfo.policy,
                OSSAccessKeyId: aliInfo.accessid,
                callback: aliInfo.callback,
                signature: aliInfo.signature
              };
            }
            // 这个上传的请求不用携带cookie
          })

        } catch(e) {
          this.$message.error('上传出错,请重新上传')
        }
    },

    handleSuccess(response, file, fileList) {
      let res = response.body;
      const batchFormat = this._myBatch(this._formatFile);
      let obj = batchFormat(file.name, res);
      this.myFileList.push(obj)
      // 肖像的操作
      this.myImageUrl = URL.createObjectURL(file.raw);
      // 肖像toast附加，备课特殊处理
      this._showIsReadyFile();

      this.onSuccess && this.onSuccess(res, file, fileList)
      // this.onSuccess && this.onSuccess(res, obj, this.fileList)
      //更新token
      this.updateLoginToken()
    },

    handleError(err, file, fileList) {
      this.onError && this.onError(err, file, fileList)
    },
    // 自定义http导致onChange不执行
    handleOnChange(file, fileList) {
      // 备课兼容处理
      this._hideIsReadyFile()
      // 上传文件的个数,其实没毛用
      this.upLoadNum = fileList.length
      // 组件中的onChange回调
      this.onChange && this.onChange(file, fileList)
    },
    // 隐藏未上传成功的dom
    _hideIsReadyFile() {
      // 多文件同时上传问题
      this.$nextTick(()=>{
        let isReady = document.getElementsByClassName('is-ready');
        for (let i = 0; i < isReady.length; i++) {
          const element = isReady[i];
          element.style.display = 'none';
        }
      })
    },
    // 显示成功的上传的dom，备课肖像特殊处理
    _showIsReadyFile() {
      this.$nextTick(()=>{
        let isSuccess = document.getElementsByClassName('is-success');
        for (let i = 0; i < isSuccess.length; i++) {
          const element = isSuccess[i];
          element.style.display = 'inline-block';
        }
      })
    },
    //获取宽高函数，并返回图片是否可以上传标识
    _createReader (file, maxWidth, maxHeight, resolve, Proportion) {
      var reader = new FileReader()
      var settings = {
        maxwidth: maxWidth,
        maxheight: maxHeight
      }
      //图片异步加载用canvas获取宽高
      reader.onload = function (evt) {
        var image = new Image()
        image.onload = function (evt) {
          var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            width = this.width,
            height = this.height
            // 成比例
          if(Proportion) {
            if(settings.maxwidth / settings.maxheight == width / height) {
              resolve(true)
            }
          }

          if(settings.maxwidth == width && settings.maxheight == height) {
            resolve(true)
          }
          resolve(false)
        }
        image.onerror = function () {
            // this.$message("+= " + file.name + " does not look like a valid image")
        }
        image.src = evt.target.result
      }
      reader.readAsDataURL(file)
    },
    // 模态框的显示和隐藏
    _toggleModal() {
      this.previewVisible = !this.previewVisible;
    },
    // 一个批处理
    _myBatch(fn) {
      return function(args, ...rest) {
        if(Array.isArray(args)) {
          return args.map(item => fn.call(this, args))
        } else {
          return fn.call(this, args, ...rest)
        }
      }
    },
    // 格式化数据
    _formatFile(name, res) {
      let obj = {};
      for(let key in res) {
        if(Object.hasOwnProperty.call(res, key)) {
          // 为以后存储增加name字段
          obj.key = res.key;
          obj.name = name;
          obj.url = res.url;
        }
      }
      return obj;
    },

    // 初始化上传参数
    _initUpload() {
      const {
        model:
          {
            ext: { label, params, params: { businessKey, token_oss }, listType, multiple, layout, tips, uploadBtnStyle, accept, limit, className, listTypeTips }
          }
      } = this.uploadProps

      //更新token
      this.updateLoginToken()

      // 设置自定义样式
      const userPropsSet = {
        tips,
        listType: listType || 'text',
        multiple: multiple || false,
        accept: accept,
        limit: limit,
        label: label,
        className: className || "upload-demo",
        listTypeTips: listTypeTips || ''
      }
      this.uploadProps = Object.assign(this.uploadProps, userPropsSet)
    },
    // 获取cookie
    _getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        }
        else {
          return null;
        }
    },
    // 设置cookie
    _setCookie(key, value, exp) {
      var date = new Date();
      date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
      document.cookie = key + "=" + value + expires + "; path=/; domain=.aixuexi.com";
    },
    // 自定义ajax
    _ajaxRequest(params, resolve, reject) {

      params = params || {};
      params.data = params.data || {};
      // 判断是ajax请求还是jsonp请求
      var json = params.jsonp ? jsonp(params) : json(params);
      // ajax请求
      function json(params) {
        // 请求方式，默认是GET
        params.type = (params.type || "GET").toUpperCase();
        // 避免有特殊字符，必须格式化传输数据
        params.data = formatParams(params.data);
        var xhr = null;

        // 实例化XMLHttpRequest对象
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else {
          // IE6及其以下版本
          xhr = new ActiveXObjcet("Microsoft.XMLHTTP");
        }
        // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
        xhr.onreadystatechange = function () {
          // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
          if (xhr.readyState == 4) {
            var status = xhr.status;
            // status：响应的HTTP状态码，以2开头的都是成功
            if (status >= 200 && status < 300) {
              var response = "";
              // 判断接受数据的内容类型
              var type = xhr.getResponseHeader("Content-type");
              if (type.indexOf("xml") !== -1 && xhr.responseXML) {
                response = xhr.responseXML; //Document对象响应
              } else if (type === "application/json") {
                response = JSON.parse(xhr.responseText); //JSON响应
              } else {
                response = xhr.responseText; //字符串响应
              }
              // 成功回调函数
              if(resolve) {
                resolve(response)
              } else {
                params.success && params.success(response);
              }
              // params.success && params.success(response);
            } else {
              if(reject) {
                reject(response)
              } else {
                params.error && params.error(status);
              }
              // params.error && params.error(status);
            }
          }
        };

        // 连接和传输数据
        if (params.type === "GET") {
          // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
          xhr.open(params.type, params.url + "?" + params.data, params.async);
          xhr.withCredentials = true;
          xhr.send(null);
        } else {
          xhr.open(params.type, params.url, true);
          // xhr.withCredentials = true;
          //必须，设置提交时的内容类型
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
          );
          // 传输数据
          xhr.send(params.data);
        }
      }

      //格式化参数
      function formatParams(data) {
        var arr = [];
        for (var name in data) {
          // encodeURIComponent() ：用于对 URI 中的某一部分进行编码
          arr.push(
            encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
          );
        }
        // 添加一个随机数参数，防止缓存
        arr.push("v=" + random());
        return arr.join("&");
      }

      // 获取随机数
      function random() {
        return Math.floor(Math.random() * 10000 + 500);
      }
    },
    // token 莫名其妙自动过期，所以要及时更新token
    updateLoginToken() {
      // 重新更新token时间
      const {
        model:
          {
            ext: { params: { businessKey, token_oss }}
          }
      } = this.uploadProps
      var _token_oss = '';
      let that = this;
      // 获取登陆token
      if (token_oss) {
        _token_oss = token_oss;
      } else {
        _token_oss = this.loginToken;
      }

      let loginCookie = this._getCookie(_token_oss);
      this._setCookie('token_oss', encodeURIComponent(loginCookie), 30);
    }


   },

  watch: {

  },

  created () {
    // 挂载数据时，更新自定义
   this._initUpload()
  },

  beforeUpdate() {
    const val = this.myFileList;
    if(val == undefined || val == []){
      this.upLoadNum= 0
    }else{
      this.upLoadNum=val.length;
    }
  },

  mounted () {
  },

  render (h) {
    
    // return (
    // )
  }
}

</script>


<style lang="less" scoped>
.modal-container {
  width: 100%; 
  height:100%; 
  position: fixed; 
  top: 0; 
  left: 0; 
  z-index: 100; 
  background-color: rgba(2, 0, 0, 0.8); 
  overflow: hidden;
  .modal-container-ele {
    object-fit: scale-down; 
    width: 100%; 
    height:80%;
    margin-top: 5%;
  }
}
// 肖像
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
// 照片墙
.el-upload--picture-card {
  position: relative;
}
.el-upload--picture-card .list-type-tips {
  position: absolute;
}
</style>
<style>
.axx-upload .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  height: auto;
  vertical-align: middle;
}
.axx-upload .el-upload-list--picture-card .el-upload-list__item-status-label {
  line-height: 24px;
}
</style>