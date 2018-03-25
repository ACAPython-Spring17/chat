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

    this.offConnect = chat.onConnect(this.handleConnect);

    this.offLogin = chat.onLogin(() => {
      props.history.push('/chat');
    });

    const username = getUsernameFromSession();

    this.state = {
      username,
    };
  }

  componentWillUnmount() {
    this.offConnect();
    this.offLogin();
  }

  handleConnect = () => {
    if (this.state.username) {
      chat.addUser(this.state.username);
    } else {
      this.props.history.push('/login');
    }
  };

  handleLogin = (username) => {
    this.setState(
      {
        username,
      },
      () => chat.addUser(username),
    );
  };

  render() {
    const { username } = this.state;

    return (
      <div className="grid-y grid-frame align-center">
        <Switch>
          <Route path="/login" render={() => <Login onLogin={this.handleLogin} />} />
          <Route path="/chat" render={() => <Chat username={username} />} />
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

export default withRouter(ChatApp);
