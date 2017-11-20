import React, { Component } from 'react'
import MessageList from './MessageList'
import VessageList from './VessageList'
import MessageForm from './MessageForm'
import axios from 'axios';
import '../styles/main.css'

class MessageBox extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
    this.loadMessagesFromServer = this.loadMessagesFromServer.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
  }

  loadMessagesFromServer() {
    // axios.get(this.props.url)
    //   .then(res => {
    //     this.setState({ data: res.data })
    //   })
    const { url } = this.props
    fetch(url)
    .then(response => {
      return response.json()
      console.log(`called ${url} `);
    })
    .then(json => {
      this.setState({ data: json })
    })
    .catch(error => {
      console.log(`failed to fetch from ${url}`)
      this.setState({ data: [] })
    })
  }

  handleMessageSubmit(message) {

  }

  componentDidMount() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval)
  }

  // componentDidUpdate() {
  //   this.loadMessagesFromServer();
  //   setInterval(this.loadMessagesFromServer, this.props.pollInterval)
  // }

  // componentWillUpdate() {
  //   this.loadMessagesFromServer();
  //   setInterval(this.loadMessagesFromServer, this.props.pollInterval)
  // }

  // componentWillMount() {
  //   this.loadMessagesFromServer();
  //   setInterval(this.loadMessagesFromServer, this.props.pollInterval)
  // }
  
  // <VessageList { ...data } />
  // <MessageList data={ data }/>

  render() {
    const { data } = this.state
    console.log("data.messages in MessageBox: ", data.messages);
    return (
      <div className="MessageBox">
        <h2>Messages:</h2>
      <MessageList messages={ data.messages }/>
      
      <MessageForm onMessageSubmit={ this.handleMessageSubmit } />
      </div>
    )
  }
}

export default MessageBox;