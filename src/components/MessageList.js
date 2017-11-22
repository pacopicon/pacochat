import React, { Component } from 'react';
import Message from './Message';
import '../styles/main.css';

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.renderMessages = this.renderMessages.bind(this)
  }

  componentWillUpdate() {
    var messageList = document.querySelector('.messageList')
    messageList.scrollTop = messageList.scrollHeight
  }

  componentDidUpdate() {
   var messageList = document.querySelector('.messageList')
    messageList.scrollTop = messageList.scrollHeight
  }

  // componentWillMount() {
  //  var list = document.querySelector('.list')
  //   if (list) {
  //     list.scrollTop = list.scrollHeight
  //   }
  // }

  // Original solution (works)

  // renderMessages(messages) {
  //   console.log("messages = ", messages)
  //   if (typeof messages !== 'undefined') {
  //     return (
  //     <div>
  //     { messages.map(message => <div key={ message._id } userid={ message.userId }>{ message.body }</div>) }
  //     </div>
  //     )
  //   }
  // }

  // renderMessages(messages) {
  //   console.log("messages = ", messages)
  //   if (typeof messages !== 'undefined') {
  //     return (
  //     <div>
  //     { messages.map(message => <Message userId={ message.userId } key={ message['_id'] }>{ message.body }</Message>) }
  //     </div>
  //     )
  //   }
  // }

  // renderMessages(messages) {
  //   console.log("messages = ", messages)
  //   if (typeof messages !== 'undefined') {
  //     return (
  //     <div className="list">
  //     { messages.map(message => <Message message={ message } key={ message['_id'] }></Message>) }
  //     </div>
  //     )
  //   }
  // }

// Refactor of the code immediately above:
  renderMessages(messages) {
    // console.log("messages = ", messages)
    return (
      <div className="list">
        { typeof messages !== 'undefined' 
          ? messages.map(message => <Message 
                                      message={ message } 
                                      key={ message['_id'] }
                                      uniqueId={ message['_id'] }
                                      update={ this.props.update }
                                      delete={ this.props.delete }>
                                    </Message>) 
          : <div></div> 
        }
      </div>
    )
  }

  render() {
    var { messages } = this.props
    // console.log("messages in  MessageList: ", messages)
    
    return (
      <div className="messageList">
        { this.renderMessages(messages) } 
      </div>
    )
  }

// Don't do this, it does not work.  It will result in a TypeError: messages.map is not a function
  // render() {
  //   var { messages } = this.props
  //   console.log("data in  MessageList: ", messages)
  //   let messageNodes = messages.map(message => {
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

// Some takeAways regarding rendering data from a localhost API:
// -- When looping over Array elements with Map, make sure to expose the child object that contains those elements
// -- Render the Mapped elements within Render() only through a separate Rendering function called within Render()
// -- Within that rendering function, wrap the Mapping function within a conditional that checks to see that typeof array is not "undefined" | if (array !== "undefined") | 