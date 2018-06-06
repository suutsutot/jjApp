import React, {Component} from 'react';
import {Image} from 'react-native';
import {Header} from 'react-native-elements';
import styles from './styles';

export const HeaderSection = (props) => {
    return (
        <Header
            backgroundColor='#00bcd4'
            outerContainerStyles={styles.shadowContainer}
            leftComponent={ <Image
                style={styles.logo}
                source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}
            />}
            centerComponent={{text: props.title, style: {color: '#fff', fontSize: 18}}}
        />
    )
};
