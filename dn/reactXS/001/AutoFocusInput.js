import React, { Component } from 'react';

class AutoFocusInput extends Component {
  componentDidMount () {
    this.abc.focus()
  }

  render () {
    return (
      <input ref={(input) => this.abc = input} />
    )
  }
}
export default AutoFocusInput