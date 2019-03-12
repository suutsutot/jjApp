import * as React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';

import RegistrationPersonalData from 'src/components/Registration/RegistrationTabView/RegistrationPersonalData';
import RegistrationActities from 'src/components/Registration/RegistrationTabView/RegistrationActities';
import RegistrationTab from 'src/components/Registration/RegistrationTabView/RegistrationTab';
import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';

import styles from './styles';

const PersonalData = () => <RegistrationPersonalData />;
const Activities = () => <RegistrationActities />;
const Registration = () => <RegistrationTab />;

class RegistrationTabView extends React.Component {
  state = {
    routes: [
      { key: 'Registration', title: i18n('registration_tab') },
      { key: 'PersonalData', title: i18n('general_tab') },
      { key: 'Activities', title: i18n('activities_tab') }
    ]
  };

  render() {
    const { changeTabIndex, tabIndex } = this.props;

    return (
      <TabView
        navigationState={{ index: tabIndex, routes: this.state.routes }}
        renderScene={SceneMap({
          Registration,
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

export default connect(
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
)(RegistrationTabView);
