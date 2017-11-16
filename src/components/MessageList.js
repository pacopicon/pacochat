import React, { Component } from 'react';
import Message from './Message';
import style from './style';

class MessageList extends Component {
  render() {
    let messageNodes = this.props.data.map(message => {
      return (
        <Message author={ message.author } key={ message.id }>
          { message.text}
        </Message>
      )
    })
    return (
      <div style={ style.messageList }>
        { messageNodes }
      </div>
    )
  }
}

export default MessageList;