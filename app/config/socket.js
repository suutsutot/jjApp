import 'app/config/userAgent';
import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PushController from './../PushController';
import io from 'socket.io-client';
import config from 'app/config';
import {getNotifications} from 'app/api/NotificationsAPI';
import {refresh} from 'app/api/refreshTokenAPI';
const socket = io(config.server, {jsonp: false, transports: ['websocket']});

const updateNotifications = payload => ({
    type: 'UPDATE_NOTIFICATIONS',
    payload
});

const handleSocketMessage = payload => dispatch => {
    getNotifications().then((data) => {
        dispatch(updateNotifications(data));
    })
};

export class SocketListener extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const {handleSocketMessage} = this.props;

        socket.on('connect', function () {
            refresh().then((newToken) => {
                if (newToken) socket.emit('authenticate', {token: newToken.idToken});
            });
        });

        socket.on('notification added', function (data) {
            console.log('notification added');
            handleSocketMessage(data);

            // push notifications
            let date = new Date(Date.now() + 1000);

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }

            let message = data.creatorName + ' invites you to event';

            PushNotification.localNotificationSchedule({
                title: "You have new notification",
                message: message,
                date,
            });

        });

        socket.on('notification updated', function (data) {
            console.log('notification updated');
            handleSocketMessage(data);

            // push notifications
            let date = new Date(Date.now() + 1000);

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }

            let message = data.creatorName + ' invites you to event';

            PushNotification.localNotificationSchedule({
                title: "You have new notification",
                message: message,
                date,
            });
        });
    }

    render() {
        return <View><PushController /></View>;
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSocketMessage: (data) => dispatch(handleSocketMessage(data))
    };
};

export default connect(null, mapDispatchToProps)(SocketListener);
