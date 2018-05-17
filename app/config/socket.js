import 'app/config/userAgent';
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
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
    componentDidMount() {
        const {handleSocketMessage} = this.props;
        socket.on('connect', function () {
            refresh().then((newToken) => {
                socket.emit('authenticate', {token: newToken.idToken});
            });
        });

        socket.on('notification added', function (data) {
            console.log('notification added');
            handleSocketMessage(data);
        });

        socket.on('notification updated', function (data) {
            console.log('notification updated');
            handleSocketMessage(data);
        });
    }

    render() {
        return <View />;
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSocketMessage: (data) => dispatch(handleSocketMessage(data))
    };
};

export default connect(null, mapDispatchToProps)(SocketListener);
