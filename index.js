import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './app/App';

// console.disableYellowBox = true;

export default class jjApp extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('justJoinApp', () => jjApp);
