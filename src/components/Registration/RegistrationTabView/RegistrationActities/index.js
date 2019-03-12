import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { values } from 'ramda';

import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';
import Icon from 'src/config/icon-font.js';
import { activitiesData } from 'src/api/registrationAPI.js';

import styles from './styles';

const ActivityView = ({ item, toogleActivity, selectedActivities }) => {
  const activityTitle =
    i18n(item.type)
      .charAt(0)
      .toUpperCase() + i18n(item.type).slice(1);
  const noActivity = selectedActivities.indexOf(item.type) === -1;

  return (
    <TouchableOpacity
      style={noActivity ? styles.notActiveView : styles.activeView}
      onPress={() => toogleActivity(item.type)}
    >
      <Icon
        name={item.type.toLowerCase()}
        size={40}
        style={noActivity ? styles.notActiveLogo : styles.activeLogo}
      />
      <Text
        style={
          noActivity ? styles.notActiveTitleStyle : styles.activeTitleStyle
        }
      >
        {activityTitle}
      </Text>
    </TouchableOpacity>
  );
};
class RegistrationActivities extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchActivities();
  }

  fetchActivities() {
    activitiesData().then(data => {
      console.log('data', data)
    });
  }

  render() {
    const { selectedActivities, activities, toogleActivity } = this.props;

    return (
      <View style={styles.view}>
        <FlatList
          data={values(activities)}
          renderItem={({ item }) => (
            <ActivityView
              item={item}
              toogleActivity={toogleActivity}
              selectedActivities={selectedActivities}
            />
          )}
        />
      </View>
    );
  }
}

export default connect(
  ({ registration }) => {
    const {
      data: { activities },
      selectedActivities
    } = registration;
    return { activities, selectedActivities };
  },
  dispatch => {
    return {
      toogleActivity: payload =>
        dispatch(actions.registration.toogleActivity(payload))
    };
  }
)(RegistrationActivities);