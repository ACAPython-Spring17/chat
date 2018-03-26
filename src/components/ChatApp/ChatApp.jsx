import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import chat, { getUsernameFromSession } from '../../core/chat';

import Login from '../Login/Login';
import Chat from '../Chat/Chat';

class ChatApp extends Component {
  constructor(props) {
    super(props);

    this.offChatConnect = chat.onConnect(this.handleChatConnect);
    this.offChatLogin = chat.onLogin(this.handleChatLogin);

    this.state = {
      username: getUsernameFromSession(),
      numUsers: 0,
    };
  }

  componentWillUnmount() {
    this.offChatConnect();
    this.offChatLogin();
  }

  handleChatConnect = () => {
    if (this.state.username) {
      chat.addUser(this.state.username);
    } else {
      this.props.history.push('/login');
    }
  };

  handleChatLogin = ({ numUsers }) => {
    this.setState({ numUsers }, () => this.props.history.push('/chat'));
  };

  handleLogin = (username) => {
    this.setState({ username }, () => chat.addUser(username));
  };

  render() {
    const { username, numUsers } = this.state;

    return (
      <div className="grid-y grid-frame align-center">
        <Switch>
          <Route path="/login" render={() => <Login onLogin={this.handleLogin} />} />
          <Route
            path="/chat"
            render={() => <Chat username={username} initialNumUsers={numUsers} />}
          />
          <Route render={() => <CircularProgress />} />
        </Switch>
      </div>
    );
  }
}

ChatApp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export { ChatApp };

export default withRouter(ChatApp);
