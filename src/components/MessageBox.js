import React, { Component } from 'react'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import axios from 'axios';
import '../styles/main.css'

class MessageBox extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
    this.loadMessagesFromServer = this.loadMessagesFromServer.bind(this)
    this.handleMessageUpdate = this.handleMessageUpdate.bind(this)
    this.handleMessageDelete = this.handleMessageDelete.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
  }

  loadMessagesFromServer() {
    const { BASEurl } = this.props
    // Axios alternative:
    // axios.get(GETurl)
    //   .then(res => {
    //     this.setState({ data: res.data })
    //   })

    // Fetch Alternative (for GET, fetch works just fine):
    
    fetch(BASEurl) 
    .then(response => {
      return response.json()
      console.log(`called ${BASEurl} `);
    })
    .then(json => {
      this.setState({ data: json })
    })
    .catch(error => {
      console.log(`failed to fetch from ${BASEurl}`)
    })
  }

  // scoped as onMessageSubmit when passed to props:
  handleMessageSubmit(message) {
    const { POSTurl } = this.props
    console.log("message within handleMessageSubmit: ", message)
    let messages = this.state.data
    let newMessages = [...messages, message]

    axios.post(POSTurl, message)
    .then(res => {
      console.log(`${res.json()} POSTed to ${POSTurl}`);
      this.loadMessagesFromServer()  // this isn't absoluntely necessary
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

  handleMessageDelete(id) {
    const DELETEurl = `${this.props.BASEurl}/${id}`
    axios.delete(DELETEurl)
      .then(res => {
        console.log(`Message w/ id ${id} was deleted`)
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleMessageUpdate(id, message) {
    const PUTurl = `${this.props.BASEurl}/${id}`
    axios.put(PUTurl, message)
      .then(res => {
        console.log(`Message w/ id ${id} was updated`)
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval)
  }

  render() {
    const { data } = this.state
    // console.log("data.messages in MessageBox: ", data.messages);
    return (
      <div className="MessageBox">
        <h2>Messages:</h2>
      <MessageList 
        messages={ data.messages }
        update={ this.handleMessageUpdate }
        delete={ this.handleMessageDelete }  
      />
      
      <MessageForm submit={ this.handleMessageSubmit } />
      </div>
    )
  }
}

export default MessageBox;