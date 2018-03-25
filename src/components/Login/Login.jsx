import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class Login extends Component {
  state = {
    error: false,
  };

  handleKeyPress = (event) => {
    const { onLogin } = this.props;
    const value = event.target.value.trim();

    if (event.key === 'Enter') {
      if (value) {
        onLogin(value);
        this.setState({ error: false });
      } else {
        this.setState({ error: true });
      }
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div className="grid-x align-center">
        <TextField
          name="username"
          floatingLabelText="Username"
          hintText="Enter your username"
          errorText={error ? 'Username cannot be empty' : ''}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default Login;
