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
      :multiple='true'
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
// import S from 'service';
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
    },
    multiple: {
      type: Boolean,
      default: false
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
      AXX_UPLOAD_OPAPI_INFOS: {
        openApiKey: '',
        openApiToken: ''
      },
      AXX_ACTION_STORAGE: {
        UploadUrl: "//storage.aixuexi.com/api/upload/post/signature",
        OpenApi: "//mall.aixuexi.com/vampire/storage/signature"
      },
      // 上传需要的参数
      postData: {},
      tryLoadNum: 0,
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

    myConsole(key, exc) {
      return console.log('%c upload>>>>>'+key+': '+exc,'color:red;font-size:18px')
    },

    getOpenApiInfos() {
      let { model: {
        ext: {
          openApiUploadTokenName
        }
      }} = this.uploadProps
      // let _openApiUploadTokenName = this.uploadProps.model.ext.openApiUploadTokenName;
      // console.log('openApiUploadToken: ',_openApiUploadTokenName)
      if(openApiUploadTokenName) {
        console.log('S: ',S,' name: ',openApiUploadTokenName,' S.',S.openApiUploadTokenName)
        return S[_openApiUploadTokenName].then((data)=>{
          this.AXX_UPLOAD_OPAPI_INFOS.openApiKey = data.businessKey;
          this.AXX_UPLOAD_OPAPI_INFOS.openApiToken = data.token;
        }, (err)=>{
          this.myConsole('fatestone', err)
        })
        .catch((err)=>{
          this.myConsole('catch fatestone', err)
        })
        // return this.getOpenApiInfosPro(openApiUploadToken)
      }
      return this._ajaxRequest({
        url: this.AXX_ACTION_STORAGE.OpenApi,
        method: 'post'
      }).then((data)=>{
        this.AXX_UPLOAD_OPAPI_INFOS.openApiKey = data.businessKey;
        this.AXX_UPLOAD_OPAPI_INFOS.openApiToken = data.token;
      }, (err)=>{
        this.myConsole('fatestone', err)
      })
      .catch((err)=>{
        this.myConsole('catch fatestone', err)
      })
    },

    setUploadInfos(file, businessKey) {
    return this._ajaxRequest({
      url: this.AXX_ACTION_STORAGE.UploadUrl,
      method: 'post',
      data: {
        businessKey: businessKey,
        uploadFiles: [
          {
            "fileNameOrSuffix": file.name
          }
        ]
      },
      openApiToken: this.AXX_UPLOAD_OPAPI_INFOS.openApiToken
      }).then((data)=>{
        let infos = {};
        data[0]['uploadInfo']['bodyArrs'].forEach((item)=>{
          infos[item.key] = item.value
        })

        this.$nextTick(()=>{
          this.postURL = data[0]['uploadInfo']['url'];
        })

        this.postData = {
          key: infos['key'],
          token: infos["token"],
          policy: infos["policy"],
          OSSAccessKeyId: infos["OSSAccessKeyId"],
          callback: infos["callback"],
          signature: infos["signature"],
          success_action_status: '200',
        }
    
      }, (err)=>{
        this.myConsole('signature', err)
      })
      .catch((e)=>{
        
        this.tryLoadNum++;

        if(this.tryLoadNum>=2) {
          return new Promise(()=> {
              this.myConsole('limitNumber', 'try to get openApiToken exceeding the limit')
              return false
            })
        }
      
      })
    },

    async handleBeforeUpload(file) {
      let _businessKey = '';
      this.tryLoadNum = 0;
      const {
        model:
          {
            ext: { listType, multiple, accept, maxFiles, maxSize, params: { businessKey, token_oss }, WHcontrol, openApiUploadToken }
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
        // 获取权限
        if (!openApiUploadToken) {

          await this.getOpenApiInfos();

        } else if(typeof openApiUploadToken === 'object'){
          // await this.getOpenApiInfosPro(openApiUploadToken)
          await openApiUploadToken.then((data)=>{
            this.AXX_UPLOAD_OPAPI_INFOS.openApiKey = data.businessKey;
            this.AXX_UPLOAD_OPAPI_INFOS.openApiToken = data.token;
          },(res)=>{
            this.myConsole('catch openApiUploadToken', err)
          })
        } else {
          this.AXX_UPLOAD_OPAPI_INFOS.openApiToken = openApiUploadToken;
        }
      
        // 如果传入配置文件传入businessKey,就用。否则使用openApi请求返回的key
        if(businessKey) {
          _businessKey = businessKey
        } else {
          _businessKey = this.AXX_UPLOAD_OPAPI_INFOS.openApiKey
        }

        // 设置上传相关信息
        await this.setUploadInfos(file, _businessKey);

        // 尝试多次获取上传信息
        if(this.tryLoadNum) {

          await this.getOpenApiInfos();

          await this.setUploadInfos(file, this.AXX_UPLOAD_OPAPI_INFOS.openApiKey);

        }

        } catch(e) {
          this.$message.error('上传出错,请重新上传')
        }
    },

    // getOpenApiInfosPro(openApiUploadToken) {
    //   return openApiUploadToken.then((data)=>{
    //         this.AXX_UPLOAD_OPAPI_INFOS.openApiKey = data.businessKey;
    //         this.AXX_UPLOAD_OPAPI_INFOS.openApiToken = data.token;
    //       },(res)=>{
    //         this.myConsole('catch openApiUploadToken', err)
    //       })
    // },

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
    _ajaxRequest(opt) {
      opt.async = opt.async === undefined ? true : false
      opt = opt || {}
      opt.method = opt.method.toUpperCase() || 'GET'
      opt.url = opt.url || ''
      opt.data = opt.data || null
      let xmlHttp = null
      if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest()
      }
      else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      let params = {}
      for (let key in opt.data) {
        params[key] = opt.data[key]
      }
      let postData = JSON.stringify(params)  
      return new Promise((resolve, reject) => {
        if (opt.method.toUpperCase() === 'POST') {
          xmlHttp.open(opt.method, opt.url, opt.async)
          xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
          // xmlHttp.withCredentials = true;
          if(opt.openApiToken) 
          xmlHttp.setRequestHeader('X-Storage-Authorization', opt.openApiToken)
          xmlHttp.send(postData)
        }
        else if (opt.method.toUpperCase() === 'GET') {
          xmlHttp.open(opt.method, opt.url + (postData ? '?' + postData : ''), opt.async)
          xmlHttp.withCredentials = true
          xmlHttp.send(null)

        }

        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
            if (!xmlHttp.responseText) reject()
            resolve(JSON.parse(xmlHttp.responseText).body)
          }
        }
      })
    },

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