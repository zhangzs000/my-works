import React, { Component } from 'react';
import Comment from './Comment'

class CommentList extends Component {
  constructor(props) {
    super(props)

  }

  haddleDeleteComment(index) {
    if(this.props.onDeleteComment){
      this.props.onDeleteComment(index)
    }
  }
  render() {
    const comments = [
      {username: 'Jerry', content: 'Hello'},
      {username: 'Tomy', content: 'World'},
      {username: 'Lucy', content: 'Good'}
    ]
    
    return(
      <div>
        {/*为什么箭头函数不能加{}，加上就不渲染了。eg:
        comments.map((item, i)=>{<Comment comment={item} key={i}/>})
        如果加上{},里面必须有return
        {comments.map((item, i)=>{return <Comment comment={item} key={i}/>})}
        */}
        {this.props.msgList.map((item, i)=><Comment 
          comment={item} 
          key={i}
          index= {i}
          onDeleteComment = {this.haddleDeleteComment.bind(this)}
          />)}
        
      </div>
    )
  }
}
export default CommentList;