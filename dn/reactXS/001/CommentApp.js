import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Clock from './Clock'
import AutoFocusInput from './AutoFocusInput'
import Card from './Card'

// 高阶组件
import InputComp from './InputComp' 


class CommentApp extends Component {
  constructor() {
    super()
    this.state={
      comment:[],
      isShowClock: true
    }
  }
  componentWillMount () {
    this._loadComments()
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comment: comments })
    }
  }
  handleSendMsg(obj) {
     if (!obj) return
    if (!obj.username) return alert('请输入用户名')
    if (!obj.content) return alert('请输入评论内容')
    const { comment } = this.state
    // console.log('jj: ',this.deepcopy(comment))
    let arr = this.deepcopy(comment)
    arr.push(obj)
    this.setState({
      comment: arr
    })
    this._saveComments(arr)
  }
  shouldComponentUpdate(nextProps,nextState){ 
    // console.log('this.state: ',this.state.comment,' next state: ',nextState.comment)
    return true
  }
  
  deepcopy(obj) {
            var out = [],i = 0,len = obj.length;
            for (; i < len; i++) {
                if (obj[i] instanceof Array){
                    out[i] = this.deepcopy(obj[i]);
                }
                else out[i] = obj[i];
            }
            return out;
  }
  handleShowOrHide() {
    this.setState({
      isShowClock: !this.state.isShowClock
    })
  }
  haddleDeleteComment(index) {
    const { comment } = this.state
    let arr = this.deepcopy(comment)
    arr.splice(index, 1)
    this.setState({
      comment: arr
    })
    this._saveComments(arr)
  }
  render() {
    console.log('this.state.comment: ',this.state.comment)
    return(
      <div className='wrapper'>
        <CommentInput
          onSubmit = {this.handleSendMsg.bind(this)}
        />
        <CommentList 
          msgList={this.state.comment}
          onDeleteComment = {this.haddleDeleteComment.bind(this)}
          />
        <Card>
          <div>
            <h2>React.js 小书</h2>
            <div>开源、免费、专业、简单</div>
            订阅：<input />
          </div>
         </Card>
         {/*
           <AutoFocusInput />

           {this.state.isShowClock ? <Clock /> : null }
            <button onClick={this.handleShowOrHide.bind(this)}>
              显示或隐藏时钟
            </button>
         */}
        <InputComp />
      </div>
    )
  }
}
export default CommentApp;