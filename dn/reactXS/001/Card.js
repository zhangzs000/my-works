import React, { Component } from 'react';
class Card extends Component {
  constructor(props){
    super(props)
  }
  render () {
    console.log('this.props.children.props.children: ',this.props.children.props.children)
    // console.log('props.children: ',props.children)
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Card;