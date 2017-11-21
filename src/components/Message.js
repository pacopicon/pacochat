import React, { Component } from 'react';
import '../styles/main.css';
import marked from 'marked';

class Message extends Component {
  constructor(props) {
    super(props)
    this.renderMessage = this.renderMessage.bind(this)
  }

renderMessage(message) {
  return (
      <div className="message">
        <b className="name">{ message.userName }</b>: { message.body }
      </div>
    )
}

render() {
  var { message } = this.props
    return (
      <div className="message">
        {this.renderMessage(message)}
      </div>
    )
  }

}

export default Message;