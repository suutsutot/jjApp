import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

import ActivityItem from './ActivityItem';
import actions from 'src/data/actions';

import styles from './styles';

const RegistrationActivities = ({ activitiesList, postActivities }) => {
  return (
    <View style={styles.view}>
      <FlatList
        data={activitiesList}
        renderItem={({ item: id }) => <ActivityItem id={id} />}
      />
      <ActionButton
        renderIcon={() => (
          <MaterialIcons name="check" color="white" size={24} />
        )}
        buttonColor="#00bcd4"
        onPress={() => postActivities()}
      />
    </View>
  );
};

export default R.compose(
  connect(
    ({ registration }) => {
      const { activitiesList } = registration;
      return { activitiesList };
    },
    {
      postActivities: actions.registration.postActivities
    }
  )
)(RegistrationActivities);
