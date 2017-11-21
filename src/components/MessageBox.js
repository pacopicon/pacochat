import React, { Component } from 'react'
import MessageList from './MessageList'
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
    // Axios alternative:
    // axios.get(this.props.url)
    //   .then(res => {
    //     this.setState({ data: res.data })
    //   })

    // Fetch Alternative (for GET, fetch works just fine):
    const { GETurl } = this.props
    fetch(GETurl)
    .then(response => {
      return response.json()
      console.log(`called ${GETurl} `);
    })
    .then(json => {
      this.setState({ data: json, loading: false })
    })
    .catch(error => {
      console.log(`failed to fetch from ${GETurl}`)
    })
  }

  // scoped as onMessageSubmit when passed to props:
  handleMessageSubmit(message) {
    this.setState({
      loading: true
    })
    const { POSTurl } = this.props
    console.log("message within handleMessageSubmit: ", message)
    let messages = this.state.data
    let newMessages = [...messages, message]

    axios.post(POSTurl, message)
    .then(res => {
      console.log(`${res.json()} POSTed to ${POSTurl}`);
      // this.loadMessagesFromServer()  // this isn't absoluntely necessary
      this.setState({ data: newMessages }) // this isn't absoluntely necessary
    })
    .catch(err => {
      console.error(err) 
      this.setState({ data: messages }) // this isn't absoluntely necessary
    })

    // Alternative setup:

    // handleCommentSubmit(message) {
    //   let messages = this.state.data;
    //   message._id = Date.now();
    //   let newMessages = [...messages, message]
    //   this.setState({ data: newMessages });
    //   axios.post(this.props.url, message)
    //     .catch(err => {
    //       console.error(err);
    //       this.setState({ data: comments });
    //     });
    // }

    // With Fetch (it doesn't seem to work after many attempts):

    // var myHeaders = new Headers()
    // var init = {
    //   method: 'POST',
    //   // headers: myHeaders,
    //   headers: {
    //     "Content-type": "text/plain"
    //   },
    //   mode: 'no-cors',
    //   // cache: 'default',
    //   // body: JSON.stringify(message)
    //   body: message
    // }

    // fetch(POSTurl, init)
    // .then(response => {
    //   console.log(`${response.json()} POSTed to ${POSTurl}`);
    //   return response.json()
    // })
    // .then(json => {
    //   console.log(`${json} POSTed to ${POSTurl}`);
    //   this.loadMessagesFromServer()
    // })
    // .catch(error => {
    //   console.log(`failed to POST to ${POSTurl}`)
    // })

  }

  componentDidMount() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval)
  }

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