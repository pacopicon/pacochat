import React, { Component } from 'react';
import Message from './Message';
import '../styles/main.css';

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.renderMessages = this.renderMessages.bind(this)
  }

  // componentDidMount() {
  //   this.setState({
  //     data: this.props.data
  //   })
  // }

  renderMessages(messages) {
    console.log("messages = ", messages)
    if (typeof messages !== 'undefined') {
      return (
      <div>
      { messages.map(message => <div key={ message._id } userId={ message.userId }>{ message.body }</div>) }
      </div>
      )
    }
  }

  // renderMessages(data) {
  //   data.map(message => {
  //     console.log(`message = ${message}`)
  //   })
  // }

  render() {
    var { messages } = this.props
    console.log("messages in  MessageList: ", messages)
    
    return (
      <div className="messageList">
        { this.renderMessages(messages) } 
      </div>
    )
  }

  // render() {
  //   var { data } = this.props.data
  //   console.log("data in  MessageList: ", data)
  //   let messageNodes = data.map(message => {
  //     return (
  //       <Message userId={ message.userId } key={ message['_id'] }>
  //         { message.body }
  //       </Message>
  //     )
  //   })
  //   return (
  //     <div className="messageList">
  //       { messageNodes }
  //     </div>
  //   )
  // }


}

export default MessageList;