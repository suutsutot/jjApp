import { filter } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { navigationListener } from 'app/config/navigationHelpers';
import Events from 'app/components/Home/index';
import Communities from 'app/components/Communities/index';
import Notifications from 'app/components/Notifications/index';
import Settings from 'app/components/Settings/index';
import Login from 'app/components/Login/index';
import AuthLoadingScreen from 'app/components/AuthLoadingScreen/index';
import { getNotificationsCounter } from 'app/data/notifications/selectors';

const routes = {
  Notifications: {
    screen: Notifications,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => (
        <IconBadge
          MainElement={
            <MaterialIcons name={`notifications`} size={24} color={tintColor} />
          }
          BadgeElement={
            <Text style={{ color: 'white' }}>
              {screenProps.notificationsCounter}
            </Text>
          }
          Hidden={screenProps.notificationsCounter === 0}
        />
      )
    })
  },
  Events: {
    screen: Events,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Events',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name={`calendar-range`}
          size={24}
          color={tintColor}
        />
      )
    })
  },
  Communities: {
    screen: Communities,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Communities',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name={`account`} size={24} color={tintColor} />
      )
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Settings',
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
  order: ['Notifications', 'Events', 'Communities', 'Settings'],
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
    AuthLoadingScreen,
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
  notificationsCounter: getNotificationsCounter(state)
}))(Router);
