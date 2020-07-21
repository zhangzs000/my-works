import React, { Component } from 'react';
import InputWithUserName from './InputWithUserName'
import TextareaWithContent from './TextareaWithContent'

class Index extends Component {
  render () {
    return (
      <div>
        用户名：<InputWithUserName />
        textarea: <TextareaWithContent />
      </div>
    )
  }
}
export default Index