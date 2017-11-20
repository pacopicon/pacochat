import React, { Component } from 'react';
import Message from './Message';
import '../styles/main.css';

const VessageList = ({ data = [] }) => {
    // var data = data.messages
    console.log("data in VessageList: ", data)
    let messageNodes = data.map(message => {
      return (
        <Message userId={ message.userId } key={ message['_id'] }>
          { message.body }
        </Message>
      )
    })
    return (
      <div className="messageList">
        { messageNodes }
      </div>
    )
}

export default VessageList;