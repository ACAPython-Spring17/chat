import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import io from 'socket.io-client';

import Login from '../Login/Login';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
    };

    this.socket = io('192.168.88.82:3000');

    this.socket.on('connect', () => {
      this.setState({ connected: true });
    });

    this.socket.on('user joined', ({ username }) => {
      console.log(`User: ${username} has been joined`);
    });

    this.socket.on('login', () => {
      console.log('Logged in');
    });
  }

  handleLogin = (username) => {
    this.socket.emit('add user', username);
  };

  render() {
    const { connected } = this.state;

    return (
      <MuiThemeProvider>
        <div className="grid-y grid-frame align-center">
          {connected ? <Login onLogin={this.handleLogin} /> : 'Connecting...'}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(App);
