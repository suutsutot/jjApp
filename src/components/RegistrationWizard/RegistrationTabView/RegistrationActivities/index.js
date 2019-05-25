import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';

import ActivityItem from './ActivityItem';

import styles from './styles';

class RegistrationActivities extends Component {
  render() {
    const { activitiesList } = this.props;

    return (
      <View style={styles.view}>
        <FlatList
          data={activitiesList}
          renderItem={({ item: id }) => <ActivityItem id={id} />}
        />
      </View>
    );
  }
}

export default R.compose(
  connect(({ registration }) => {
    const { activitiesList } = registration;
    return { activitiesList };
  })
)(RegistrationActivities);
