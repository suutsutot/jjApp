import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';

import actions from 'src/data/actions';
import Icon from 'src/config/icon-font.js';
import withPhoneTranslations from 'src/hocs/withPhoneTranslations';

import styles from './styles';

const ActivityView = withPhoneTranslations(
  ({ item, toggleActivity, selectedActivities, i18n }) => {
    const noActivity = selectedActivities.indexOf(item.id) === -1;

    return (
      <TouchableOpacity
        style={noActivity ? styles.notActiveView : styles.activeView}
        onPress={() => toggleActivity(item.id)}
      >
        <Icon
          name={R.toLower(R.replace('_', '-', item.id))}
          size={40}
          style={noActivity ? styles.notActiveLogo : styles.activeLogo}
        />
        <Text
          style={
            noActivity ? styles.notActiveTitleStyle : styles.activeTitleStyle
          }
        >
          {i18n(item.id, 'activities')}
        </Text>
      </TouchableOpacity>
    );
  }
);

class RegistrationActivities extends Component {
  render() {
    const { selectedActivities, activities, toggleActivity } = this.props;

    return (
      <View style={styles.view}>
        <FlatList
          data={R.values(activities)}
          renderItem={({ item }) => (
            <ActivityView
              item={item}
              toggleActivity={toggleActivity}
              selectedActivities={selectedActivities}
            />
          )}
        />
      </View>
    );
  }
}

export default R.compose(
  connect(
    ({ registration }) => {
      const {
        data: { activities },
        selectedActivities
      } = registration;
      return { activities, selectedActivities };
    },
    dispatch => {
      return {
        toggleActivity: payload =>
          dispatch(actions.registration.toggleActivity(payload))
      };
    }
  ),
  withPhoneTranslations
)(RegistrationActivities);
