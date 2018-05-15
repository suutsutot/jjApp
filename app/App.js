import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {View} from 'react-native'
import store from 'app/config/store'

import SocketListener from 'app/config/socket'

import Master from 'app/components/Master'

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Master />
                    <SocketListener />
                </View>

            </Provider>

        )
    }
}

export default App;
