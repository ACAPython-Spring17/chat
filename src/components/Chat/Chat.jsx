import React, { Component } from 'react';
import PropTypes from 'prop-types';

import chat from '../../core/chat';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.offNewMessage = chat.onNewMessage(({ username, message }) => {
      console.log(`Received message from ${username} with message: ${message}`);
    });
  }

  componentWillUnmount() {
    this.offNewMessage();
  }

  render() {
    return (
      <div className="grid-y grid-frame">
        <div className="cell auto cell-block">messages</div>
        <div className="cell shrink">new message input</div>
      </div>
    );
  }
}

Chat.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Chat;
