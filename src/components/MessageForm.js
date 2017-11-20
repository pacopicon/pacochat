import React, { Component } from 'react'
import '../styles/main.css'
import uuidv4  from 'uuid/v4'

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userName: 'Paco', 
      body: '', 
      date: new Date(), 
      userId: uuidv4(), 
      room: ''
    };
    // this.handleAuthorChange = this.handleAuthorChange.bind(this);
    // this.handleBodyChange = this.handleBodyChange.bind(this);
    // this.handleRoomChange = this.handleRoomChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleAuthorChange(e) {
  //   this.setState({ name: e.target.value });
  // }

  // handleBodyChange(e) {
  //   this.setState({ body: e.target.value });
  // }

  // handleRoomChange(e) {
  //   this.setState({ room: e.target.value });
  // }

  // handleRoomChange(e) {
  //   // this.setState({ [e.target.]]: e.target.value });
  // }

  // handleSubmit(e) {
  //   const { body, userName, userId, date, room } = this.state
  //   e.preventDefault();
  //   console.log(`${userId} said "${body}"`)
    
  //   if (!body) {
  //     return
  //   }
  //   var message = { body, userName, userId, date, room }
  //   this.props.onMessageSubmit(message)
  //   this.setState(message)
  // }

  handleSubmit() {
    if (!this._body.value) {
      return
    }

    const { loading } = this.props

    if (!loading) {
      var message = {
      body: this._body.value,
      userName: this.state.userName,
      userId: this.state.userId,
      date: new Date(),
      room: this._room.value,
    }
    console.log(`${this._room.value} said "${this._body.value}"`)
    this.props.handleMessageSubmit(message)
    this.setState(message)
    }
    
  }

  renderButton() {
    
  }

  render() {
    return (
      <form className="messageForm" onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Say something...'
          className="messageFormText"
          ref={input => this._body = input} 
        />
        <input
          type='text'
          placeholder='choose room or person'
          className="messageFormText"
          ref={input => this._room = input} 
        />
        <button
          type='submit'
          className="messageFormPost" 
          value='Post'
          onClick={this.handleSubmit}>post
        </button>
      </form>
    )
  }
}

export default MessageForm;