import React, { Component } from 'react';
import '../styles/main.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    // the http var (which == `address/{port #}`) below is defined in server/server-address.js, a file restricted to all files in src.  So we must hardcode in the meantime.
    // var address = `localhost:7777`
    // var http = `${address}/messages`
    // fetch(http)
    // .then(response => {
    //   return response.json()
    //   .then(json => {
    //     console.log('SUCCEEDED!!!: ', json)
    //     this.setState({
    //       messages: json 
    //     })
    //   })
    //   .catch(error => {
    //     console.log('failed to get messages: ', error)
    //   })
    // })
  }

  handleChange(e) {
    console.log("e.target.value = ", e.target.value)
    this.setState({
      room: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.state.messages}
        </div>
        <form>
          <input type="text" onChange={this.handleChange.bind(this)} />
          <input type="submit" value="Submit" />
        </form>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
