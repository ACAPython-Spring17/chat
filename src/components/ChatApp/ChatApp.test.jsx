import React from 'react';
import ChatApp from './ChatApp';

describe('ChatApp', () => {
  const history = {
    push: jest.fn(),
  };

  it('should render normally', () => {
    expect(shallow(<ChatApp history={history} />)).toMatchSnapshot();
  });
});
