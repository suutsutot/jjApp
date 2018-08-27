import 'app/config/userAgent';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import io from 'socket.io-client';

import config from 'app/config';
import { setList } from 'app/data/actions';
import {getNotifications} from 'app/api/NotificationsAPI';
import {refresh} from 'app/api/refreshTokenAPI';

const socket = io(config.server, {jsonp: false, transports: ['websocket']});

const handleSocketMessage = payload => async dispatch => {
  const data = await getNotifications();
  dispatch(updateNotifications(data))
};

const title = 'You have new notification';
const getDate = () => {
  const date = new Date(Date.now() + 1000);
  return Platform.OS === 'ios' ? date.toISOString() : date;
};
const getMessage = (creatorName) => {
  return `${creatorName} invites you to event`;
};

const SocketController = lifecycle({
  componentDidMount() {
    const {handleSocketMessage} = this.props;

    socket.on('connect', async () => {
      const newToken = await refresh();
      if (newToken && newToken.idToken) {
        socket.emit('authenticate', {token: newToken.idToken});
      }
    });
    
    socket.on('notification added', (data) => {
      console.log('notification added');
      // handleSocketMessage(data);
      
      const payload = {
        title,
        message: getMessage(data.creatorName),
        date: getDate()
      };
      
      // PushNotification.localNotificationSchedule(payload);
    });
    
    socket.on('notification updated', function (data) {
      console.log('notification updated');
      // handleSocketMessage(data);
  
      const payload = {
        title,
        message: getMessage(data.creatorName),
        date: getDate()
      };
  
      // PushNotification.localNotificationSchedule(payload);
    });
  }
})(() => null);

export default connect(
  undefined,
  {
    handleSocketMessage
  }
)(SocketController);
