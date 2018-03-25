import React from 'react';
import { hot } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';

import ChatApp from '../ChatApp/ChatApp';

const App = () => (
  <MuiThemeProvider>
    <BrowserRouter>
      <ChatApp />
    </BrowserRouter>
  </MuiThemeProvider>
);

export default hot(module)(App);
