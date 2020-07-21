import React from 'react'
import { Icon, message } from 'antd'
import { render } from 'react-dom'

// import Upload from 'fantasy/widgets/axx-upload'
import './index.less'
import API from 'apis'
import { relative } from 'path';

/** 
 * 上传页面
 */
export default class uploadCourse extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fileList: [],
      picUrl: '',
      lessonId: 0,
      lessonName: '',
      lessonStatus: 0,
      videoName: '',
      oldReplayUrl: ''
    }
    this.uploadProps =
    { model:{
        ext: {
          label: '上传视频',
          listType: 'text',
          layout: 'inline',
          params: {businessKey: 'TRAIN'},
          multiple: false,
          accept: ["mp4"],
          maxSize: 2048,
          WHcontrol: {control: false, width: 210, height: 210},
          maxFiles: 1,
          tips: '支持mp4格式上传，最大上传2048M'
        }
      }
    }
  }

  onChangCategory = (fileList) => {
    if(fileList[0]) {
      this.setState({
        picUrl: fileList[0].url,
        fileList
      })
      if (fileList[0].response) {
        let _key = fileList[0].response.body.key;
        let _url = fileList[0].response.body.url;
        API.teacher.liveMgr.uploadVideo({ id: this.state.lessonId, replayUrl: _key, status: 1}).then((data) => {
          if (data.body.status == 1) {
            message.info('上传成功!!')
            this.setState({
              lessonStatus: 1,
              videoName: fileList[0].name,
              oldReplayUrl: _url
            })
          } else {
            message.error('上传失败!')
          }
        })
      }
      return
    }
    // this.setState({
    //   picUrl: '',
    //   fileList: []
    // })
    
  }
  onRemoveVideo = (type) => {
     API.teacher.liveMgr.uploadVideo({ id: this.state.lessonId, replayUrl: '', status: -1, oldReplayUrl: this.state.oldReplayUrl}).then((data) => {
      if (data.body.status == 1) {
        message.info('视频移除成功!!')
        this.setState({
          lessonStatus: -1,
          fileList: []
        })
      } else {
        message.error('操作失败！')
      }
    })
  }
  
  componentWillMount () {
    // let _id = location.href.split('#lessonId=')[1];
    // const { fileList } = this.state;
    // this.setState({ lessonId: _id })
    // API.teacher.liveMgr.lessonDetail({ id: _id }).then((data) => {
    //    if (data.body.status == 1) {
    //     const { title, status, replayUrl, courseId } = data.body.body;
    //     // 将视频列表回显到页面
    //     let file = {};
    //     file.uid = courseId
    //     file.name = title;
    //     file.key = courseId;
    //     file.url = replayUrl;
    //     if(replayUrl) fileList.push(file);
    //     this.setState({
    //       lessonName: title,
    //       lessonStatus: status,
    //       oldReplayUrl: replayUrl,
    //       fileList
    //     })
    //     if (status ===1 ) {
    //       const videoName = data.body.body.replayUrl.match(/([^/]+)$/)[1];
    //       this.setState({videoName: videoName});
    //     }
    //   } else {
    //     message.error('获取课程信息失败!')
    //   }
    // })
  }

  render () {
    const { lessonStatus } = this.state;
    return (
       <div className="upload-wrap">
         <h1>
           {this.state.lessonName}
           {
            lessonStatus === 1?
            <strong>(已上传)</strong>
            :
            <strong>(未上传)</strong>
           }</h1>
         <Icon type="inbox" onClick={this.onChangCategory}/>
         {/**
         <Upload 
            {...this.uploadProps} 
            value={this.state.fileList} 
            onChange={this.onChangCategory}
            onRemove={this.onRemoveVideo}
          ></Upload> 
        */}
         
          <p className="upload-tips">上传过程中请在网络畅通的情况下<strong>保持登录状态！</strong></p> 
       </div>
    )
  }
}
