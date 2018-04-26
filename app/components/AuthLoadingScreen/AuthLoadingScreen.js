// - Import react components
import React, { Component } from 'react'
import {View, ActivityIndicator, StatusBar, AsyncStorage, Image} from 'react-native'

// - Import component styles
import styles from './styles'

class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
        // setTimeout(() => {this._bootstrapAsync()}, 5000)
    }

    _bootstrapAsync = async () => {
        const userId = await AsyncStorage.getItem('userId');
        this.props.navigation.navigate(userId ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}
                />
                {/*<ActivityIndicator />*/}
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

// - Connect component to redux store
export default (AuthLoadingScreen)