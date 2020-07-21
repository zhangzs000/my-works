import React from 'react'
import { Upload, message, Modal, Button, Icon } from 'axxd'
import './index.less'
/*
  新增：
  相册样式：uploadBtnStyle: 1；按钮样式：uploadBtnStyle: 0；
  文档链接： https://shimo.im/docs/AgSwQdU9CbAG5KjF/

  示例(复制到项目里面就行)：
  this.uploadProps =
    { model:{
        ext: {
          label: '上传视频',
          listType: 'text',
          layout: 'inline',
          params: {businessKey: ''},
          multiple: true,
          accept: ["mp4","png","jpg"],
          maxSize: 2048,
          openApiUploadToken: '',
          WHcontrol: {control: false, width: 210, height: 210},
          maxFiles: 3,
          tips: '支持mp4格式上传，最大上传2048M'
        }
      }
    }
  <Upload
    {...this.uploadProps}
    value={this.state.fileList}
    onChange={this.onChangCategory}
    onRemove={this.onRemoveVideo}
  ></Upload>
*/
let AXX_UPLOAD_OPAPI_INFOS = {
  openApiKey: '',
  openApiToken: ''
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previewVisible: false,
      previewFileType: 'img',
      previewImage: '',
      tips: '',
      token: '',
      tokenUrl: '',
      // 用于维护上传的文件数量
      upLoadNum: (props.value && props.value.length) || 0,
      fileList: props.fileList || [],
      storageKey: '',
      //用于预览得视频格式检测
      allVideo: [
        'flv',
        'swf',
        'mkv',
        'avi',
        'rm',
        'rmvb',
        'mpeg',
        'mpg',
        'ogg',
        'ogv',
        'mov',
        'wmv',
        'mp4',
        'webm',
        'mp3',
        'wav',
        'mid'
      ],
      //用于预览得图片格式检测
      allImage: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
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
      uploadBtnStyle: 0,
      // // openApi相关
      // openApiToken: '',
      // openApiKey: ''
      tryLoadNum: 0
    }

    //用于上传得端口初始化
    ;(this.uploadProps = {
      defaultFileList: [],
      listType: 'text',
      // multiple: false,
      accept: '',
      className: 'upload-list-inline'
    }),
      (this.AXX_ACTION_STORAGE = {
        UploadUrl: '//storage.aixuexi.com/api/upload/post/signature',
        OpenApi: '//api.aixuexi.com/fatestone/gray/getUploadToken'
      })
  }

  //获取宽高函数，并返回图片是否可以上传标识
  createReader = (file, maxWidth, maxHeight, resolve, Proportion) => {
    var reader = new FileReader()
    var settings = {
      maxwidth: maxWidth,
      maxheight: maxHeight
    }
    //图片异步加载用canvas获取宽高
    reader.onload = function(evt) {
      var image = new Image()
      image.onload = function(evt) {
        var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          width = this.width,
          height = this.height
        if (Proportion) {
          if (settings.maxwidth / settings.maxheight == width / height) {
            resolve(true)
            return
          }
        }

        if (settings.maxwidth == width && settings.maxheight == height) {
          resolve(true)
          return
        }
        resolve(false)
      }
      image.onerror = function() {
        // message("+= " + file.name + " does not look like a valid image")
      }
      image.src = evt.target.result
    }
    reader.readAsDataURL(file)
  }

  //图片视频等预览函数
  handlePreview = file => {
    //检测视频格式
    const isVideo = this.state.allVideo.some(item => {
      return (
        file.name
          .split('.')
          .pop()
          .toLowerCase() == item
      )
    })

    //检测图片格式
    const isImage = this.state.allImage.some(item => {
      return (
        file.name
          .split('.')
          .pop()
          .toLowerCase() == item
      )
    })

    //设定当前预览文件格式
    if (isVideo) {
      var previewFileType = 'video'
      var previewVisible = true
    } else if (isImage) {
      var previewFileType = 'img'
      var previewVisible = true
    } else {
      var previewFileType = 'otherType'
      var previewVisible = false
    }

    if (previewFileType == 'otherType') {
      message.warning('当前预览文件非图片或视频')
      location.href = file.url || file.thumbUrl
      return
    }
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible,
      previewFileType
    })
  }
  myConsole(key, exc) {
    return console.log(
      '%c upload>>ㄟ(▔,▔)ㄏ>>>' + key + ': ' + exc,
      'color:red;font-size:18px'
    )
  }

  getOpenApiInfos() {
    return this.ajaxRequest({
      url: this.AXX_ACTION_STORAGE.OpenApi,
      method: 'post'
    }).then(
      data => {
        AXX_UPLOAD_OPAPI_INFOS.openApiKey = data.businessKey
        AXX_UPLOAD_OPAPI_INFOS.openApiToken = data.token
      },
      err => {
        this.myConsole('fatestone', err)
      }
    )
  }

  setUploadInfos(file, businessKey) {
    let { tryLoadNum } = this.state

    return this.ajaxRequest({
      url: this.AXX_ACTION_STORAGE.UploadUrl,
      method: 'post',
      data: {
        businessKey: businessKey,
        uploadFiles: [
          {
            fileNameOrSuffix: file.name
          }
        ]
      },
      openApiToken: AXX_UPLOAD_OPAPI_INFOS.openApiToken
    })
      .then(
        data => {
          let infos = {}
          data[0]['uploadInfo']['bodyArrs'].forEach(item => {
            infos[item.key] = item.value
          })
          file.data = {
            key: infos['key'],
            token: infos['token'],
            policy: infos['policy'],
            OSSAccessKeyId: infos['OSSAccessKeyId'],
            callback: infos['callback'],
            signature: infos['signature'],
            success_action_status: '200'
          }
          this.setState({
            upLoadUrl: data[0]['uploadInfo']['url']
          })
        },
        err => {
          this.myConsole('signature', err)
        }
      )
      .catch(e => {
        // tryLoadNum++

        // this.setState({
        //   tryLoadNum
        // })

        // if (tryLoadNum >= 2) {
        //   return new Promise(() => {
        //     this.myConsole(
        //       'limitNumber',
        //       'try to get openApiToken exceeding the limit'
        //     )
        //     return false
        //   })
        // }
      })
  }
  //上传前回调函数
  async beforeUpload(file, fileList) {
    let { upLoadNum } = this.state

    const that = this
    let _businessKey

    //上次数量进行判断校验
    upLoadNum = upLoadNum + fileList.length
    const {
      model: {
        ext: {
          listType,
          multiple,
          accept,
          maxFiles,
          maxSize,
          params: { businessKey, token_oss },
          WHcontrol,
          openApiUploadToken
        }
      }
    } = this.props

    //判断图片尺寸是否限制
    if (WHcontrol && WHcontrol.control) {
      let flag = await new Promise(function(resolve, reject) {
        that.createReader(
          file,
          WHcontrol.width,
          WHcontrol.height,
          resolve,
          WHcontrol.Proportion
        )
      })

      //flag是返回的图片尺寸是否允许上传
      if (!flag) {
        if (WHcontrol.errorMessage) {
          message.error(WHcontrol.errorMessage)
        } else {
          message.error(
            '文件尺寸不符合，建议宽为' +
              WHcontrol.width +
              'px高为' +
              WHcontrol.height +
              'px'
          )
        }
        await new Promise(function(resolve, reject) {
          return false
        })
      }
    }

    //检测当前文件格式是否上传受限
    const isJPG = accept.some(item => {
      return (
        file.name
          .split('.')
          .pop()
          .toLowerCase() == item
      )
    })

    //检测文件大小
    const isLt2M = file.size / 1024 / 1024 < maxSize - 0

    if (!isJPG) {
      message.error('此文件类型不允许上传')
      await new Promise(function(resolve, reject) {
        return false
      })
    }

    if (!isLt2M) {
      message.error('文件大小不能超过' + maxSize + 'M!')
      await new Promise(function(resolve, reject) {
        return false
      })
    }
    //检测文件个数是否受限
    if (upLoadNum > maxFiles - 0) {
      message.error('最多上传' + maxFiles + '个文件')
      await new Promise(function(resolve, reject) {
        return false
      })
    }
    // 获取权限
    if (!openApiUploadToken) {
      await this.getOpenApiInfos()
    } else if (typeof openApiUploadToken == 'function') {
      const {
        model: {
          ext: { tokenCallback }
        }
      } = this.props
      const result = await openApiUploadToken()
      const callBackResult = tokenCallback(result.body)
      if (!callBackResult.token || !callBackResult.businessKey) {
        console.log('请在 callBackResult 函数中请返回 token 和 businessKey')
      }
      AXX_UPLOAD_OPAPI_INFOS = {
        openApiToken: callBackResult.token,
        openApiKey: callBackResult.businessKey
      }
    } else {
      AXX_UPLOAD_OPAPI_INFOS.openApiToken = openApiUploadToken
    }

    try {
      // 如果传入配置文件传入businessKey,就用。否则使用openApi请求返回的key
      if (businessKey) {
        _businessKey = businessKey
      } else {
        _businessKey = AXX_UPLOAD_OPAPI_INFOS.openApiKey
      }
      // 获取上传相关信息
      await this.setUploadInfos(file, _businessKey)

      // 尝试多次获取上传信息
      if (this.state.tryLoadNum) {
        await this.getOpenApiInfos()

        await this.setUploadInfos(file, AXX_UPLOAD_OPAPI_INFOS.openApiKey)
      }
    } catch (e) {
      message.error('上传出错,请重新上传')
      return false
    }
    return true
  }

  getCookie = name => {
    var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return null
    }
  }

  setCookie = (key, value, exp) => {
    var date = new Date()
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000)
    var expires = '; expires=' + date.toGMTString()
    document.cookie =
      key + '=' + value + expires + '; path=/; domain=.aixuexi.com'
  }

  ajaxRequest(opt) {
    opt.async = opt.async === undefined ? true : false
    opt = opt || {}
    opt.method = opt.method.toUpperCase() || 'GET'
    opt.url = opt.url || ''
    opt.data = opt.data || null
    let xmlHttp = null
    if (XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest()
    } else {
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
        xmlHttp.setRequestHeader(
          'Content-Type',
          'application/json; charset=utf-8'
        )
        if (opt.openApiToken)
          xmlHttp.setRequestHeader('X-Storage-Authorization', opt.openApiToken)
        xmlHttp.send(postData)
      } else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(
          opt.method,
          opt.url + (postData ? '?' + postData : ''),
          opt.async
        )
        xmlHttp.withCredentials = true
        xmlHttp.send(null)
      }

      xmlHttp.onreadystatechange = () => {
        if (
          xmlHttp.readyState == 4 &&
          (xmlHttp.status == 200 || xmlHttp.status == 0)
        ) {
          if (!xmlHttp.responseText) reject()
          resolve(JSON.parse(xmlHttp.responseText).body)
        }
      }
    })
  }

  uploadParams = file => {
    return file.data
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value
    //当前文件个数初始化
    if (value == undefined || value == []) {
      this.setState({ upLoadNum: 0 })
    } else {
      this.setState({ upLoadNum: value.length })
    }
    this.initialParams()
  }

  onChange = fileList => {
    const {model} = this.props

    //更新上传的文件数量
    if (fileList.fileList) {
      this.setState({
        upLoadNum: fileList.fileList.length
      })
    }
    //处理获取到的url拼接
    fileList.fileList.map(item => {
      if (item.response) {
        item.url = item.response.body.url
        if(model.ext.sizeType && model.ext.sizeType === 'MB') {
          item.dataSize = parseFloat((item.size / 1024 /1024).toFixed(4))
        }
      }
    })

    this.setState({
      fileList: fileList.fileList
    })

    this.props.onChange(fileList.fileList)
  }

  onRemove = fileList => {
    if (this.props.onRemove) {
      this.props.onRemove()
    }
    if (this.props.model.onRemove) {
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
      model: {
        ext: {
          params,
          params: { businessKey, token_oss }
        }
      }
    } = this.props
    const { loginToken } = this.state
    var _token_oss = ''
    let that = this
    // 获取登陆token
    if (token_oss) {
      _token_oss = token_oss
    } else {
      _token_oss = loginToken
    }
  }

  //图片预览modal关闭
  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

  //上传参数初始化
  initialParams() {
    const {
      model: {
        ext: { listType, multiple, layout, tips, uploadBtnStyle }
      }
    } = this.props

    if (layout === 'inline') {
      var className = 'upload-list-inline'
    } else {
      var className = ''
    }

    if (uploadBtnStyle) {
      this.setState({ uploadBtnStyle })
    }
    const userPropsSet = {
      tips,
      listType: listType,
      multiple: multiple,
      className: className
    }

    this.setState({ tips })
    this.uploadProps = Object.assign(this.uploadProps, userPropsSet)
  }

  // 上传按钮样式
  _getuploadBtnStyle() {}

  render() {
    const { value } = this.props
    const { uploadBtnStyle } = this.state
    const val =
      Array.isArray(value) && value.length == 1 && value[0].url == ''
        ? []
        : value

    return (
      <div>
        <Upload
          {...this.uploadProps}
          action={this.state.upLoadUrl}
          fileList={val}
          data={this.uploadParams}
          beforeUpload={this.beforeUpload.bind(this)}
          onChange={this.onChange}
          onRemove={this.onRemove}
          onPreview={this.handlePreview}
        >
          {uploadBtnStyle === 1 ? (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
          ) : (
            <Button>
              <Icon type="upload" /> 上传
            </Button>
          )}
        </Upload>
        <Modal
          className="upload_modal"
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          {this.state.previewVisible ? (
            this.state.previewFileType == 'img' ? (
              <img
                alt="example"
                style={{ width: '100%' }}
                src={this.state.previewImage}
              />
            ) : this.state.previewFileType == 'video' ? (
              <video
                controls
                style={{ width: '100%' }}
                src={this.state.previewImage}
              />
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </Modal>
        <p>{this.state.tips}</p>
      </div>
    )
  }
}
