import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Text } from 'react-native';

import { navigationListener } from 'app/config/navigationHelpers';
import Events from 'app/components/Events';
import Communities from 'app/components/Communities';
import Notifications from 'app/components/Notifications';
import Settings from 'app/components/Settings';
import Login from 'app/components/Login';
import StartScreen from 'app/components/StartScreen';
import { getNotViewedNotificationsCount } from 'app/data/notifications/selectors';
import BottomTabsBadge from 'app/pureComponents/BottomTabsBadge';
import i18n from 'app/framework/i18n';

const routes = {
  Notifications: {
    screen: Notifications,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: <Text>{i18n('notifications')}</Text>,
      tabBarIcon: ({ tintColor }) => (
        <Fragment>
          <MaterialCommunityIcons
            name={`calendar-range`}
            size={24}
            color={tintColor}
          />
          {screenProps.notificationsCounter !== 0 ? (
            <BottomTabsBadge number={screenProps.notificationsCounter} />
          ) : null}
        </Fragment>
      )
    })
  },
  // Events: {
  //   screen: Events,
  //   navigationOptions: ({ navigation, screenProps }) => ({
  //     tabBarLabel: <Text>{i18n('my_events')}</Text>,
  //     tabBarIcon: ({ tintColor }) => (
  //       <MaterialCommunityIcons
  //         name={`calendar-range`}
  //         size={24}
  //         color={tintColor}
  //       />
  //     )
  //   })
  // },
  // Communities: {
  //   screen: Communities,
  //   navigationOptions: ({ navigation, screenProps }) => ({
  //     tabBarLabel: <Text>{i18n('communities_tab')}</Text>,
  //     tabBarIcon: ({ tintColor }) => (
  //       <MaterialCommunityIcons name={`account`} size={24} color={tintColor} />
  //     )
  //   })
  // },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: <Text>{i18n('settings')}</Text>,
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          name={`format-list-bulleted`}
          size={24}
          color={tintColor}
        />
      )
    })
  }
};

const config = {
  initialRouteName: 'Notifications',
  order: ['Notifications', /*'Events', 'Communities', */'Settings'],
  activeTintColor: '#00bcd4',
  inactiveTintColor: 'gray',
  shifting: false,
  barStyle: {
    backgroundColor: '#fdfeff'
  }
};

export const Tabs = createMaterialBottomTabNavigator(routes, config);

export const Navigator = StackNavigator(
  {
    StartScreen,
    Tabs,
    Login
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const Router = ({ dispatch, nav, notificationsCounter }) => (
  <Navigator
    screenProps={{ notificationsCounter }}
    navigation={{
      dispatch,
      state: nav,
      addListener: navigationListener
    }}
  />
);

export default connect(state => ({
  nav: state.nav,
  notificationsCounter: getNotViewedNotificationsCount(state)
}))(Router);
