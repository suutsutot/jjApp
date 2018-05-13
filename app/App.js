import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from 'app/config/store'

import Master from 'app/components/Master'

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Master />
            </Provider>
        )
    }
}

export default App;
