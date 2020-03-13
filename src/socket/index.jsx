import io from 'socket.io-client';

import { ROOT_HTTPS_URL, ROOT_HTTP_URL } from '../private/config';

const URL = process.env === 'production' ? ROOT_HTTPS_URL : ROOT_HTTP_URL;

const socket = io(URL, {transports: ['websocket']});

const configureSocket = dispatch => {
  // make sure our socket is connected to the port
  socket.on('connect', () => {
    console.log('connected');
    socket.on('GET_DATA_GROUPS', groups => {
              console.log('3333333', groups);
            });
  });

  // the socket.on method is like an event listener
  // just like how our redux reducer works
  // the different actions that our socket/client will emit
  // is catched by these listeners
  return socket;
};

export const updateDataGroup = () => { 
  socket.emit('UPDATE_GROUP')
};

// export const socketMiddleware = (store) => {
//   return next => action => {
//     if (socket && action.type === HANDLE_GROUP_SELECTED_SUCCESS) {
//       socket.on('GET_DATA_GROUPS', groups => {
//         console.log('3333333', groups);
//       });
//     }
//  console.log(action);
//     return next(action);
//   };
// }

export default configureSocket;