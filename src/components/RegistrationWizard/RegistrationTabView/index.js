import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import * as R from 'ramda';

import RegistrationPersonalData from 'src/components/RegistrationWizard/RegistrationTabView/RegistrationPersonalData';
import RegistrationActivities from 'src/components/RegistrationWizard/RegistrationTabView/RegistrationActivities';
import actions from 'src/data/actions';
import withPhoneTranslations from 'src/hocs/withPhoneTranslations';

import styles from './styles';

const PersonalData = () => <RegistrationPersonalData />;
const Activities = () => <RegistrationActivities />;

class RegistrationTabView extends React.Component {
  render() {
    const { changeTabIndex, tabIndex, i18n } = this.props;

    return (
      <TabView
        navigationState={{
          index: tabIndex,
          routes: [
            { key: 'PersonalData', title: i18n('general_tab') },
            { key: 'Activities', title: i18n('activities_tab') }
          ]
        }}
        renderScene={SceneMap({
          PersonalData,
          Activities
        })}
        onIndexChange={index => changeTabIndex(index)}
        swipeEnabled={false}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBarStyle}
            labelStyle={styles.labelStyle}
            indicatorStyle={styles.indicatorStyle}
          />
        )}
      />
    );
  }
}

export default R.compose(
  connect(
    ({ registration }) => {
      const { tabIndex } = registration;
      return { tabIndex };
    },
    dispatch => {
      return {
        changeTabIndex: payload =>
          dispatch(actions.registration.changeTabIndex(payload))
      };
    }
  ),
  withPhoneTranslations
)(RegistrationTabView);
