import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import styles from './styles';

export const HeaderSection = (props) => {
    return (
        <Header
            backgroundColor='#00bcd4'
            outerContainerStyles={styles.shadowContainer}
            centerComponent={{text: props.title, style: {color: '#fff'}}}
        />
    )
};
