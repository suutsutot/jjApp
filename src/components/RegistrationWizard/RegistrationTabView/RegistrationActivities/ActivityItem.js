import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as R from 'ramda';

import actions from 'src/data/actions';
import Icon from 'src/config/icon-font';
import withPhoneTranslations from 'src/hocs/withPhoneTranslations';

const ActivityItem = withPhoneTranslations(
  ({ item, isSelected, toggleActivity, i18n }) => {
    return (
      <TouchableOpacity
        style={isSelected ? styles.activeView : styles.notActiveView}
        onPress={() => toggleActivity(item.id)}
      >
        <Icon
          name={R.toLower(R.replace('_', '-', item.id))}
          size={40}
          style={isSelected ? styles.activeLogo : styles.notActiveLogo}
        />
        <Text
          style={
            isSelected ? styles.activeTitleStyle : styles.notActiveTitleStyle
          }
        >
          {i18n(item.id, 'activities')}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default R.compose(
  connect(
    ({ registration }, { id }) => {
      const {
        data: { activities },
        selectedActivities
      } = registration;

      const item = activities[id];
      const isSelected = R.includes(id, selectedActivities);
      return { item, isSelected };
    },
    {
      toggleActivity: actions.registration.toggleActivity
    }
  ),
  withPhoneTranslations
)(ActivityItem);
