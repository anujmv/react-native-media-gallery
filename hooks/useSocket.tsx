import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
const API_URL = '';

export default function useSocket() {
  const connect = () => {
    const options = {
      transports: ['websocket'],
      pingTimeout: 3000,
      pingInterval: 5000,
    };
    const socket = io(API_URL, options);
    const app = feathers().configure(socketio(socket)).configure(hooks());
    app.io?.on('connect', () => {
      console.log('connected');
    });

    app.io?.on('disconnect', () => {
      console.log('disconnected');
    });
  };
  connect();
}
