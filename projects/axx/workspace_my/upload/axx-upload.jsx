import React from 'react'
import { Upload, message, Modal, Button, Icon } from 'axxd'
import './index.less'
import API from 'apis'
/*
  新增： 
  相册样式：uploadBtnStyle: 1；按钮样式：uploadBtnStyle: 0；
  登陆验证：管理中心loginToken：'token_m'； B端：loginToken：'token'；
  http://docker3-storage-dev.aixuexi.com/
*/
export default class extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      previewVisible: false,
      previewFileType: 'img',
      previewImage: '',
      tips: '',
      token: '',
      tokenUrl: '',
			// 用于维护上传的文件数量
      upLoadNum: props.value && props.value.length || 0,
      fileList: props.fileList || [],
      storageKey: '',
			//用于预览得视频格式检测
      allVideo: [
        "flv", "swf", "mkv", "avi", "rm", "rmvb", "mpeg", "mpg",
        "ogg", "ogv", "mov", "wmv", "mp4", "webm", "mp3", "wav", "mid"],
			//用于预览得图片格式检测
      allImage: ["png", "jpg", "jpeg", "gif", "bmp"],
      // 阿里相关
      upLoadUrl: '',
      policy: '',
      OSSAccessKeyId: '',
      // success_action_status: '200',
      callback: '',
      signature: '',
      // 默认的登陆token，@type: string
      loginToken: 'token_m',
      // 上传按钮的样式
      uploadBtnStyle: 0
    }

		//用于上传得端口初始化
    this.uploadProps = {
      defaultFileList: [],
      listType: 'text',
      multiple: false,
      accept: '',
      className: 'upload-list-inline',
    },
    this.AXX_ACTION_STORAGE = {
      UploadUrl: "//storage.aixuexi.com/component/uploadInfo"
    }
    
  }

	//获取宽高函数，并返回图片是否可以上传标识
  createReader = (file, maxWidth, maxHeight, resolve, Proportion) => {
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
        if(Proportion) {
          if(settings.maxwidth / settings.maxheight == width / height) {
            resolve(true)
            return
          }
        }

        if(settings.maxwidth == width && settings.maxheight == height) {
          resolve(true)
          return
        }
        resolve(false)
      }
      image.onerror = function () {
					// message("+= " + file.name + " does not look like a valid image")
      }
      image.src = evt.target.result
    }
    reader.readAsDataURL(file)
  }

	//图片视频等预览函数
  handlePreview = (file) => {
		//检测视频格式
    const isVideo = this.state.allVideo.some((item) => {
      return file.name.split('.').pop().toLowerCase() == item
    })

		//检测图片格式
    const isImage = this.state.allImage.some((item) => {
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
      message.warning('当前预览文件非图片或视频')
      location.href = (file.url || file.thumbUrl)
      return
    }
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible,
      previewFileType
    })
  }

	//上传前回调函数
  async beforeUpload(file, fileList) {
    let { upLoadNum } = this.state
    const that = this

    //上次数量进行判断校验
    upLoadNum = upLoadNum + fileList.length
    const {
			model:
				{
					ext: { listType, multiple, accept, maxFiles, maxSize, params: { businessKey, token_oss }, WHcontrol }
				}
		} = this.props

		//判断图片尺寸是否限制
    if(WHcontrol && WHcontrol.control) {
      let flag = await new Promise(function (resolve, reject) {
        that.createReader(file, WHcontrol.width, WHcontrol.height, resolve, WHcontrol.Proportion)
      })

			//flag是返回的图片尺寸是否允许上传
      if(!flag){
        if(WHcontrol.errorMessage) {
          message.error(WHcontrol.errorMessage)
        }else{
          message.error('文件尺寸不符合，建议宽为' + WHcontrol.width + 'px高为' + WHcontrol.height + 'px')
        }
        await new Promise(function (resolve, reject) {
          return false
        })
      }
    }

		//检测当前文件格式是否上传受限
    const isJPG = accept.some((item) => {
      return file.name.split('.').pop().toLowerCase() == item
    })

		//检测文件大小
    const isLt2M = file.size / 1024 / 1024 < (maxSize - 0)

    if (!isJPG) {
      message.error('此文件类型不允许上传')
      await new Promise(function (resolve, reject) {
        return false
      })
    }

    if (!isLt2M) {
      message.error('文件大小不能超过'+ maxSize +'M!')
      await new Promise(function (resolve, reject) {
        return false
      })
    }
		//检测文件个数是否受限
    if( upLoadNum > maxFiles - 0 ){
      message.error('最多上传'+ maxFiles +'个文件')
      await new Promise(function (resolve, reject) {
        return false
      })
    }

    try {

    // 获取上传相关信息
    let res = await new Promise(function (resolve, reject) {
      that.ajaxRequest({
        url: that.AXX_ACTION_STORAGE.UploadUrl,
        type: "GET",
        data: {
            businessKey: businessKey,
            originalFileName: file.name
          }
      }, resolve, reject)
    })

    res = JSON.parse(res)
    //图片上传唯一标识,在服务器的唯一表示
    var storageKey = res.body.key

    //七牛参数设置 
    if (res.body.bucketType === "QINIU") { 
      let token = res.body.qiniuSignature;
      this.setState({
        storageKey,
        token,
        upLoadUrl: 'https://upload.qiniup.com'
      })
      
    } else {//阿里
      var aliInfo = res.body.aliyunSignature;
  
      const { policy, OSSAccessKeyId, callback, signature } = this.state
      
      this.setState({
        storageKey,
        upLoadUrl: aliInfo.host,
        policy: aliInfo.policy,
        OSSAccessKeyId: aliInfo.accessid,
        callback: aliInfo.callback,
        signature: aliInfo.signature
      })
    }
   
    } catch(e) {
      message.error('上传出错,请重新上传')
      return false
    }
    return true
  }

  getCookie =(name)=> {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    }
    else {
      return null;
    }
  }

  setCookie =(key, value, exp)=> {
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/; domain=.aixuexi.com";
  }

  ajaxRequest = (params, resolve, reject)=> {
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
            resolve(response)
            // params.success && params.success(response);
          } else {
            reject(response)
            // params.error && params.error(status);
          }
        }
      };

      // 连接和传输数据
      if (params.type === "GET") {
        // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
        xhr.open(params.type, params.url + "?" + params.data, params.async);
        // 设置loginToken
        // xhr.setRequestHeader("token", params.token);
        xhr.withCredentials = true;
        xhr.send(null);
      } else {
        xhr.open(params.type, params.url, true);
        xhr.withCredentials = true;
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
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value
		//当前文件个数初始化
    if(value == undefined || value == []){
      this.setState({upLoadNum: 0})
    }else{
      this.setState({upLoadNum: value.length})
    }
    this.initialParams()
  }

  onChange = ( fileList ) => {
		//更新上传的文件数量
    if( fileList.fileList ){
      this.setState({
        upLoadNum: fileList.fileList.length
      })
    }
		//处理获取到的url拼接
    fileList.fileList.map((item) => {
      if(item.response) {

        item.url = item.response.body.url
      }
    })

    this.setState({
      fileList: fileList.fileList
    })
    this.props.onChange(fileList.fileList)
  }

  onRemove = (fileList) =>{
    if(this.props.onRemove) {
      this.props.onRemove()
    }
    if(this.props.model.onRemove) {
      this.props.model.onRemove()
    }
  }

  componentWillMount = () => {
    this.initialParams()
  }
  
  componentDidMount = () => {
    this._initUpload()
  }
  // 初始化上传参数
  async _initUpload() {
    const {
			model:
				{
					ext: { params, params: { businessKey, token_oss } }
				}
    } = this.props
    const { loginToken } = this.state;
    var _token_oss = '';
    let that = this;
    // 获取登陆token
    if (token_oss) {
      _token_oss = token_oss;
    } else {
      _token_oss = loginToken;
    }

    let loginCookie = this.getCookie(_token_oss);
    this.setCookie('token_oss', encodeURIComponent(loginCookie), 30);
  }

	//图片预览modal关闭
  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

	//上传参数初始化
  initialParams() {
    const { model: { ext: { listType, multiple, layout, tips, uploadBtnStyle } } } = this.props

    if(layout === 'inline'){
      var className = 'upload-list-inline'
    }else{
      var className = ''
    }

    if(uploadBtnStyle) {
      this.setState({ uploadBtnStyle })
    }
    const userPropsSet = {
      tips,
      listType: listType,
      multiple: multiple,
      className: className,
    }

    this.setState({ tips })
    this.uploadProps = Object.assign(this.uploadProps, userPropsSet)
  }

  // 上传按钮样式
  _getuploadBtnStyle() {

  }

  render(){
    const { value } = this.props
    const { uploadBtnStyle } = this.state;
    const val = (Array.isArray(value) && value.length == 1 && value[0].url == '') ? [] : value

    return(
			<div>
				<Upload
					{...this.uploadProps}
					action= {this.state.upLoadUrl}
					fileList={val}
          multiple={false}
					data={{
            token: this.state.token, 
            key: this.state.storageKey, 
            policy: this.state.policy,
            OSSAccessKeyId: this.state.OSSAccessKeyId,
            success_action_status: '200',
            callback: this.state.callback,
            signature: this.state.signature
          }}
					beforeUpload={this.beforeUpload.bind(this)}
					onChange={this.onChange}
					onRemove={this.onRemove}
          onPreview={this.handlePreview}
				>
        {
          uploadBtnStyle === 1?
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
          :
          <Button>
						<Icon type="upload" /> 上传
					</Button>
        }
					
          
				</Upload>
				<Modal className="upload_modal" 
					visible={this.state.previewVisible} 
					footer={null} 
					onCancel={this.handleCancel}>
					{ this.state.previewVisible ?
						this.state.previewFileType  == 'img' ?
             <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} /> :
						this.state.previewFileType  == 'video' ?
            <video controls style={{ width: '100%' }} src={this.state.previewImage} /> : '' : ''
					}
        </Modal>
				<p>{this.state.tips}</p>
			</div>
    )
  }
}






