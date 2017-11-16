import React, { Component } from 'react';
import '../styles/main.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(`${this.state.author} said "${this.state.text}"`)
    //we will be tying this into the POST method in a bit
  }
  render() {
    return (
      <form style={ style.messageForm } onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Your name...'
          className="messageFormAuthor"
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Say something...'
          className="messageFormText"
          value={ this.state.text }
          onChange={ this.handleTextChange } />
        <input
          type='submit'
          className="messageFormPost" 
          value='Post' />
      </form>
    )
  }
}

export default MessageForm;