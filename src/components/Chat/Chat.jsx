import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;

    this.socket.on('add message', (message) => {
      this.setState({ messages: [...this.state.messagses, message] })
    });
  }

  render() {
    return (

    );
  }
}

Chat.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default Chat;
