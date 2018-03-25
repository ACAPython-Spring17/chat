import io from 'socket.io-client';

const SERVER_URL = 'localhost:3000';

export function getUsernameFromSession() {
  return window.localStorage.getItem('username');
}

export function saveUsernameToSession(username) {
  window.localStorage.setItem('username', username);
}

class Chat {
  constructor() {
    this.socket = io(SERVER_URL);
  }

  onConnect(handler) {
    this.socket.on('connect', handler);

    return () => {
      this.socket.off('connect', handler);
    };
  }

  onLogin(handler) {
    this.socket.on('login', handler);

    return () => {
      this.socket.off('login', handler);
    };
  }

  onNewMessage(handler) {
    this.socket.on('new message', handler);

    return () => {
      this.socket.off('new message', handler);
    };
  }

  onNewUser(handler) {
    this.socket.on('user joined', handler);

    return () => {
      this.socket.off('user joined', handler);
    };
  }

  onStartTyping(handler) {
    this.socket.on('typing', handler);

    return () => {
      this.socket.off('typing', handler);
    };
  }

  onStopTyping(handler) {
    this.socket.on('stop typing', handler);

    return () => {
      this.socket.off('stop typing', handler);
    };
  }

  onUserLeft(handler) {
    this.socket.on('user left', handler);

    return () => {
      this.socket.off('user left', handler);
    };
  }

  addUser(username) {
    saveUsernameToSession(username);
    this.socket.emit('add user', username);
  }

  addMessage(message) {
    this.socket.emit('new message', message);
  }

  startTyping() {
    this.socket.emit('typing');
  }

  stopTyping() {
    this.socket.emit('stop typing');
  }
}

const chat = new Chat();

export default chat;
