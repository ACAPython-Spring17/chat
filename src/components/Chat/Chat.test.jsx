import React from 'react';
import Chat from './Chat';

describe('Chat', () => {
  it('should render normally', () => {
    expect(shallow(<Chat username="username" />)).toMatchSnapshot();
  });
});
