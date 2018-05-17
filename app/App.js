import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {AppState, Platform, View} from 'react-native'
import store from 'app/config/store'

import SocketListener from 'app/config/socket'
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';

import Master from 'app/components/Master'

class App extends Component {

    constructor(props) {
        super(props);

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            seconds: 5,
        };
    }

    componentDidMount() {
        // AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        // AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(Date.now() + (this.state.seconds * 1000));

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date,
            });
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Master />
                    <SocketListener />
                    {/*<PushController />*/}
                </View>

            </Provider>

        )
    }
}

export default App;
