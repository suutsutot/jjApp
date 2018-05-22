import React, { Component } from 'react'
import {View, StatusBar, AsyncStorage, Image} from 'react-native'

import styles from './styles'

class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this.bootstrapAsync();
    }

    bootstrapAsync = async () => {
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
            </View>
        );
    }
}

export default (AuthLoadingScreen)
