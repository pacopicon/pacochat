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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    this.props.submit(message)
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
        
        <input className="messageFormPost" type="submit" value="Submit" />
      </form>
    )
  }
}

// <button
          // type='submit'
          // className="messageFormPost" 
          // value='Post'
          // onClick={this.handleSubmit}>post
        // </button>

export default MessageForm;