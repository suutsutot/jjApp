import React, {Component} from 'react';
import {Image} from 'react-native';
import {Header} from 'react-native-elements';
import styles from './styles';

export const HeaderSection = (props) => {
  return (
    <Header backgroundColor='#00bcd4'
            outerContainerStyles={{borderBottomWidth: 0}}
            centerComponent={{text: props.title ? props.title : 'JustJoin', style: {color: '#fff', fontSize: 18}}} />
  )
};
