import React, { Component } from 'react';
import '../styles/main.css';
import marked from 'marked';

class Message extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="message">
        <h3>{this.props.userId}</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      </div>
    )
  }
}

export default Message;