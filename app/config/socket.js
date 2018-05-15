import 'app/config/userAgent';
import React, {Component} from 'react'
import {AsyncStorage, View} from 'react-native'
const getToken = () => AsyncStorage.getItem("idToken");
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import io from 'socket.io-client';
import config from 'app/config';
import NotificationsAPI from 'app/api/NotificationsAPI'

const socket = io(config.server, {jsonp: false, transports: ['websocket']});

const updateNotifications = payload => ({
    type: 'UPDATE_NOTIFICATIONS',
    payload
});

// const handleNotificationsMessage = payload => dispatch => {
//     const {action, data} = payload;
//     console.log('payload321', payload);
//
//
//     // NotificationsAPI.getNotifications().then((response) => {
//     //     dispatch(updateNotifications(response.data));
//     // });
//
// };
//
// ----------------------
//
// const types = {
//     eventInvitation: handleNotificationsMessage,
//     communityInvitation: handleNotificationsMessage,
// };

const handleSocketMessage = payload => dispatch => {
    const {type} = payload;
    console.log('channel123', payload.type);
    // NotificationsAPI.getNotifications().then((response) => {
    //     console.log('response222', response)
    //     dispatch(updateNotifications(response.data));
    // });
};

//----------------

export class SocketListener extends Component {
    componentDidMount() {
        const {handleSocketMessage} = this.props;

        socket.on('connect', function () {
            getToken().then((token) => {
                socket.emit('authenticate', {token: token});
            });

        });

        socket.on('notification added', function (data) {
            console.log('qwerty added', data);
            handleSocketMessage(data);
        });

        socket.on('notification updated', function (data) {
            console.log('qwerty updated', data);
            // handleSocketMessage(data);
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
