import React, { Component } from 'react'
import '../styles/main.css'
import uuidv4  from 'uuid/v4'

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: 'Paco', 
      body: '', 
      date: new Date(), 
      userId: uuidv4(), 
      room: '' 
    };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ name: e.target.value });
  }
  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }
  handleRoomChange(e) {
    this.setState({ room: e.target.value });
  }
  handleSubmit(e) {
    const { body, userName, userId, date, room } = this.state
    e.preventDefault();
    console.log(`${userId} said "${body}"`)
    
    if (!body) {
      return
    }
    var message = { body, userName, userId, date, room }
    this.props.onMessageSubmit(message)
    this.setState(message)
  }

  render() {
    return (
      <form className="messageForm" onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Say something...'
          className="messageFormText"
          value={ this.state.body }
          onChange={ this.handleBodyChange } 
        />
        <input
          type='text'
          placeholder='choose room or person'
          className="messageFormText"
          value={ this.state.room }
          onChange={ this.handleRoomChange } 
        />
        <input
          type='hidden'
          className="hidden" 
          value={ this.state.name } 
        />
        <input
          type='hidden'
          className="hidden" 
          value={ this.state.userId } 
        />
        <input
          type='hidden'
          className="hidden" 
          value={ new Date() } 
        />
          <input
          type='submit'
          className="messageFormPost" 
          value='Post'
        />
      </form>
    )
  }
}

export default MessageForm;