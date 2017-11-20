import React, { Component } from 'react'
import MessageList from './MessageList'
import VessageList from './VessageList'
import MessageForm from './MessageForm'
import axios from 'axios';
import '../styles/main.css'

class MessageBox extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], loading: false }
    this.loadMessagesFromServer = this.loadMessagesFromServer.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
  }

  loadMessagesFromServer() {
    // axios.get(this.props.url)
    //   .then(res => {
    //     this.setState({ data: res.data })
    //   })
    const { GETmessages } = this.props
    fetch(GETmessages)
    .then(response => {
      return response.json()
      console.log(`called ${GETmessages} `);
    })
    .then(json => {
      this.setState({ data: json, loading: false })
    })
    .catch(error => {
      console.log(`failed to fetch from ${GETmessages}`)
    })
  }

  // scoped as onMessageSubmit when passed to props:
  handleMessageSubmit(message) {
    this.setState({
      loading: true
    })
    const { POSTmessages } = this.props
    axios.post(POSTmessages, message)
    .then(res => {
      console.log(`${res.json()} POSTed to ${POSTmessages}`);
      this.loadMessagesFromServer()
    })
    .catch(err => {
      console.error(err)
    })

    // var myHeaders = new Headers()
    // var init = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   cache: 'default',
    //   body: message
    // }

    // fetch(POSTmessages, init)
    // .then(response => {
    //   console.log(`${response.json()} POSTed to ${POSTmessages}`);
    //   return response.json()
    // })
    // .then(json => {
    //   console.log(`${json} POSTed to ${POSTmessages}`);
    //   this.loadMessagesFromServer()
    // })
    // .catch(error => {
    //   console.log(`failed to POST to ${POSTmessages}`)
    // })

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
    const { data, loading } = this.state
    console.log("data.messages in MessageBox: ", data.messages);
    return (
      <div className="MessageBox">
        <h2>Messages:</h2>
      <MessageList messages={ data.messages } />
      
      <MessageForm handleMessageSubmit={ this.handleMessageSubmit } loading={loading} />
      </div>
    )
  }
}

export default MessageBox;