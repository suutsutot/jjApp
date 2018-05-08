import React, {Component} from 'react'
import {Header} from 'react-native-elements'

export const HeaderSection = (props) => {
    return (
        <Header
            backgroundColor='#00bcd4'
            centerComponent={{text: props.title, style: {color: '#fff'}}}
        />
    )
};
