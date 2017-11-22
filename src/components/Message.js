import React, { Component } from 'react';
import '../styles/main.css';
import marked from 'marked';

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toBeUpdated: false,
      toBeDeleted: false,
    }
    this.openUpdateDialogue = this.openUpdateDialogue.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
    this.fadeOut = this.fadeOut.bind(this)
  }

  openUpdateDialogue(e) {
    e.preventDefault
    this.setState({ toBeUpdated: !this.state.toBeUpdated})
  }

  updateMessage(e) {
    e.preventDefault()
    var body = this._body.value
    var room = this._room.value
    let id = this.props.uniqueId
    let newBody = body ? body : null
    let newRoom = room ? room : null
    let message = { body: newBody, room: newRoom }
    console.log(`id = ${id}, message = ${message}, newBody = ${newBody}, newRoom = ${newRoom}`)
    this.props.update(id, message)
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
    })
  }

  fadeOut() {
    return this.state.toBeDeleted ? 'message message-delteted' : 'message'
  }

  deleteMessage(e) {
    e.preventDefault
    this.setState({
      toBeDeleted: true,
    })
    console.log("this.state.toBeDeleted = ", this.state.toBeDeleted)
    let id = this.props.uniqueId
    this.props.delete(id)
    console.log(`Message.js: message with id ${id} deleted` )
  }

  renderMessage(message) {
    var { toBeUpdated } = this.state
    return (
      <div className={ this.fadeOut() }>
        <b className="name">{ message.userName }</b>: { message.body }<br/>
        <a href="#" className="updateLink" onClick={ this.openUpdateDialogue }>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </a>
        <a href="#" className="deleteLink" onClick={ this.deleteMessage }>
          <i className="fa fa-times" aria-hidden="true"></i>
        </a>
        {
          (toBeUpdated)
          ? (
              <form onSubmit={ this.updateMessage } >
                <input 
                  type="text"
                  placeholder='update message'
                  className="commentFormText"
                  ref={input => this._body = input} 
                />
                <input 
                  type="text"
                  placeholder='update room'
                  className="commentFormText"
                  ref={input => this._room = input} 
                />
                <input className="messageFormPost" type="submit" value="update" />
              </form>
            )
          : null
        }
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
 
} // end of Class

export default Message;