import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Text } from 'react-native';

import { navigationListener } from 'src/config/navigationHelpers';
import Events from 'src/components/Events';
import Communities from 'src/components/Communities';
import Notifications from 'src/components/Notifications';
import Settings from 'src/components/Settings';
import Login from 'src/components/Login';
import StartScreen from 'src/components/StartScreen';
import UserProfile from 'src/components/UserProfile';
import Registration from 'src/components/Registration';
import { getNotViewedNotificationsCount } from 'src/data/notifications/selectors';
import BottomTabsBadge from 'src/pureComponents/BottomTabsBadge';
import i18n from 'src/framework/i18n';

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
    Login,
    Registration,
    UserProfile
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'StartScreen',
    navigationOptions: {
      gesturesEnabled: false
    }
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
