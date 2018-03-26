import React from 'react';
import { ChatApp } from './ChatApp';
import chat from '../../core/chat';

jest.mock('../../core/chat');

describe('ChatApp', () => {
  const history = {
    push: jest.fn(),
  };

  it('should render normally', () => {
    expect(shallow(<ChatApp history={history} />)).toMatchSnapshot();
  });

  it('should assign handlers when created', () => {
    const wrapper = shallow(<ChatApp history={history} />);
    expect(chat.onConnect).toHaveBeenCalledWith(wrapper.instance().handleChatConnect);
    expect(chat.onLogin).toHaveBeenCalledWith(wrapper.instance().handleChatLogin);
  });

  describe('handleChatConnect', () => {
    it('should redirect to /login if username is empty', () => {
      const wrapper = shallow(<ChatApp history={history} />);
      wrapper.instance().handleChatConnect();
      expect(history.push).toHaveBeenCalledWith('/login');
    });

    it('should call chat.addUser if username is not empty', () => {
      const wrapper = shallow(<ChatApp history={history} />);
      wrapper.setState({ username: 'username' });
      wrapper.instance().handleChatConnect();
      expect(chat.addUser).toHaveBeenCalledWith('username');
    });
  });

  describe('handleLogin', () => {
    it('should set username to state and call chat.addUser afterwards', () => {
      const wrapper = shallow(<ChatApp history={history} />);
      wrapper.instance().handleLogin('john');
      expect(wrapper.state('username')).toEqual('john');
      wrapper.update();
      expect(chat.addUser).toHaveBeenCalledWith('john');
    });
  });

  describe('componentWillUnmount', () => {
    it('should off events', () => {
      const wrapper = shallow(<ChatApp history={history} />);

      const offLogin = jest.fn();
      const offConnect = jest.fn();
      wrapper.instance().offChatLogin = offLogin;
      wrapper.instance().offChatConnect = offConnect;

      wrapper.unmount();
      expect(offLogin).toHaveBeenCalled();
      expect(offConnect).toHaveBeenCalled();
    });
  });
});
