import React, { Component } from 'react';

class Clock extends Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
    // console.log('construct')
  }

  componentDidMount () {
    // console.log('component did mount')
  }

  componentWillMount () {
    //  console.log('component will mount')
    this.timer = setInterval(() => {
      this.setState({ date: new Date() })
    }, 1000)
  }
  componentWillUnmount () {
    // console.log('component will unmount')
    clearInterval(this.timer)
  }

  render () {
    // console.log('render')
    return (
      <div>
        <h1>
          <p>现在的时间是</p>
          {this.state.date.toLocaleTimeString()}
        </h1>
      </div>
    )
  }
}
export default Clock;