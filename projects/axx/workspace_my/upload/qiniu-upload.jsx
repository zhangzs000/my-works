import React from 'react'
import { message, Modal, Button, Icon} from 'antd'
import API from 'apis'
import Types from '../types'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.uploadConfig = {}
    this.uploader = {}
  }

  onChange(value) {
    this.props.onChange(value)
  }

  componentWillReceiveProps = (nextProps) => {

  }

  /**
   * 创建dom元素
   * 
   * @param {any} ele 
   * @param {any} attr 
   * @param {any} html 
   */
  _createElement(ele, attr, html) {
    let element = document.createElement(ele)
        attr.map((item) => {
          element.setAttribute(item.attrName, item.attrVal)
        })
        element.innerHTML = html
    return element
  }

  _init() {
    console.log(1111111)
    const body = document.getElementsByTagName('body')[0]
                    body.appendChild(this._createElement("Link", [{attrName: 'href', attrVal: '/assets/libs/qiniu/plupload/styles/main.css'}, 
                    {attrName: 'rel', attrVal: 'stylesheet'}], '', ''))
  body.appendChild(this._createElement("Link", [{attrName: 'href', attrVal: '/assets/libs/qiniu/plupload/styles/highlight.css'}, 
                    {attrName: 'rel', attrVal: 'stylesheet'}], '', ''))
  body.appendChild(this._createElement("Link", [{attrName: 'href', attrVal: '/assets/libs/qiniu/bootstrap/dist/css/bootstrap.css'}, 
                    {attrName: 'rel', attrVal: 'stylesheet'}], '', ''))
  }

  _getUploadConfig() {
    this.uploadConfig = this.props.model.ext || {}
  }

  // 检测当前文件格式是否上传受限
  _checkFileType(up, file) {
    const { accept } = this.uploadConfig
	  const isJPG = accept && accept.some((item) => {
			return file.name.split('.').pop().toLowerCase() == item
		})

	  if (!isJPG) {
	    message.error('此文件类型不允许上传')
      up.stop()
      up.removeFile(file.id)
      return false
	  }
    return true
  }

	// 检测文件大小
  _checkFileSize(up, file) {
    const { maxSize } = this.uploadConfig
	  const isLt2M = file.size / 1024 / 1024 < (maxSize-0)

	  if (!isLt2M) {
	    message.error('文件大小不能超过'+ maxSize +'M!')
      up.stop()
      up.removeFile(file.id)
      return false
	  }
    return true
  }

  // 检测文件个数是否受限
  _checkFilesNum(up, file) {
    const { maxFiles } = this.uploadConfig
    console.log('up.files: ',up.files,' file: ',file)
    if( up.files.length > maxFiles - 0 ) {
      message.error('最多上传'+ maxFiles +'个文件')
      up.stop()
      up.removeFile(file.id)
      return false
    }
    return true
  }

	async _createReader(file, maxWidth, maxHeight, Proportion) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      var settings = {
        maxwidth: maxWidth,
        maxheight: maxHeight
      }
      // 图片异步加载用canvas获取宽高
      reader.onload = function(evt) {
        var image = new Image()
        image.onload = function(evt) {
          var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          width = this.width,
          height = this.height
          if(Proportion) {
            if(settings.maxwidth/settings.maxheight == width/height) {
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
        image.onerror = function() {
            // message("+= " + file.name + " does not look like a valid image")
        }
        image.src = evt.target.result
      }
      reader.readAsDataURL(file)
    })
	}

  async _checkFileWidthAndHeight(up, file) {
    const self = this
    const { 
      WHcontrol, 
      WHcontrol: { control, width, height, errorMessage, Proportion },
    } = this.uploadConfig

		// 判断图片尺寸是否限制
		if(control) {
			const flag = await self._createReader(file.getSource(), width, height, Proportion)

			// flag是返回的图片尺寸是否允许上传
			if(!flag){
				if(errorMessage) {
					message.error(errorMessage)
				}else{
					message.error('文件尺寸不符合，建议宽为' + width + 'px高为' + height + 'px')
				}
        up.stop()
        up.removeFile(file.id)
        return false
			}
      return true
		}
  }

  async _initQiniu() {
    const { params, params: { bucketName }, urlToken } = this.uploadConfig
    const self = this
    let uploadFlag = true
    try {
      var tokenAndprefixUrl = await urlToken(params)
    }catch(e) {
      message.error('获取token出错')
      return
    }

    var uploader = Qiniu.uploader({
                            runtimes: 'html5,flash,html4',    //上传模式,依次退化
                            browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
                            uptoken_url: '/shooter/qiniu/fetchUploadToken?bucketName=' + bucketName,            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                            // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                            // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                            // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                            domain: tokenAndprefixUrl.body.url,   //bucket 域名，下载资源时用到，**必需**
                            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                            container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
                            max_file_size: '10000mb',           //最大文件体积限制
                            flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                            max_retries: 3,                   //上传失败最大重试次数
                            dragdrop: true,                   //开启可拖曳上传
                            drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                            chunk_size: '4mb',                //分块上传时，每片的体积
                            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                            init: {
                                'FilesAdded': function(up, files) {
                                    // $('table').show();
                                    // $('#success').hide();
                                    // plupload.each(files, function(file) {
                                    //   var progress = new FileProgress(file,
                                    //     'fsUploadProgress');
                                    //   progress.setStatus("等待...");
                                    //   progress.bindUploadCancel(up);
                                    // });
                                },
                                'BeforeChunkUpload': function(up, file, chunkBlob, offset) {
                                    // return Promise.resolve(false)
                                    // return false

                                },
                                'BeforeUpload': async function(up, file) {
                                  console.log('BeforeUpload....')
                                  const flag1 = self._checkFileType(up, file)
                                  const flag2 = self._checkFileSize(up, file)
                                  const flag3 = self._checkFilesNum(up, file)
                                  let flag4 = true
                                  if(/^\w*\.(png)?(bmp)?(jpg)?(jpeg)?(PNG)?|(JPG)?$/.test(file.name)) {
                                    // flag4 = await self._checkFileWidthAndHeight(up, file)
                                    // up.stop()
                                  }
                                  if(!flag1 || !flag2 || !flag3 || !flag4) {
                                    uploadFlag = false
                                    up.removeFile(file.id)
                                  }
                                  return false
                                  var progress = new FileProgress(file, 'fsUploadProgress');
                                  var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                                  if (up.runtime === 'html5' && chunk_size) {
                                      progress.setChunkProgess(chunk_size);
                                  }
                                  
                                },
                                'UploadProgress': function(up, file) {
                                  var progress = new FileProgress(file, 'fsUploadProgress');
                                  var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                                  progress.setProgress(file.percent + "%", file.speed, chunk_size);
                                  // 每个文件上传时,处理相关的事情
                                  progress.bindUploadCancel(uploader, self.handleOnchange)
                                },
                                'FileUploaded': function(up, file, info) {
                                  var progress = new FileProgress(file, 'fsUploadProgress');
                                  progress.setComplete(up, info.response, tokenAndprefixUrl.body.url);
                                  // const info1 = JSON.parse(info.response)
                                  self.handleOnchange()
                                  progress.bindUploadCancel(uploader, self.handleOnchange)
                                },
                                'Error': function(up, err, errTip) {
                                },
                                'UploadComplete': function() {
                                  $('#success').show();
                                },
                                'Key': function(up, file) {
                                  var key = +new Date() + '/' + (+new Date()) + '.' + file.name.split('.').pop()
                                  return key
                                }
                            }
                        });
    this.uploader = uploader
    var example = [
    //   {
    //   id: '111',
    //   name: 'xxx.png',
    //   status: 5,
    //   reponse: 'Server Error 500', // custom error message to show
    //   url: 'http://doubletea-video.aixuexi.com/1512037859095/8098773_204507657000_2.jpg',
    // }, {
    //   id: '222',
    //   name: 'yyy.png',
    //   status: 5,
    //   url: 'http://doubletea-video.aixuexi.com/1512037859095/8098773_204507657000_2.jpg',
    // }, {
    //   id: '333',
    //   name: 'zzz.png',
    //   status: 5,
    //   reponse: 'Server Error 500', // custom error message to show
    //   url: 'http://doubletea-video.aixuexi.com/1512037859095/8098773_204507657000_2.jpg',
    // }
  ]
  var files = this.props.value
  console.log(6655, files)
    var progress = new FileProgress(null, 'fsUploadProgress')
    progress.backShow(files, 'fsUploadProgress', uploader, this.handleOnchange)
    progress.bindUploadedCancel(uploader, this.handleOnchange)
    progress.bindUploadCancel(uploader, this.handleOnchange)
    this.handleOnchange()
  }

  handleOnchange = () => {
    var progress = new FileProgress(null, 'fsUploadProgress')
    let fileList = progress.getFileList()
    this.onChange(fileList)
  }

  componentDidMount() {
    this._getUploadConfig()
    this._initQiniu()
  }

  componentWillMount = () => {
    this._init()
    
  }

  componentWillReceiveProps() {
    // new FileProgress().backShow(7, 'fsUploadProgress')
  }

  render() {
    return <div id="container">
              <a class="btn btn-default btn-lg " id="pickfiles" href="#" >
                  <i class="glyphicon glyphicon-plus"></i>
                  <span>选择文件</span>
              </a>
              <table class="table table-striped table-hover text-left">
                <tbody id="fsUploadProgress">
                </tbody>
              </table>
            </div>
  }
}
