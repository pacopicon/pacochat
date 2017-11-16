import React, { Component } from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import DATA from '../data';
import style from './style';
import '../styles/main.css';

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="MessageBox">
        <h2>Messages:</h2>
      <MessageList data={ DATA }/>
      <MessageForm />
      </div>
    )
  }
}

export default MessageBox;