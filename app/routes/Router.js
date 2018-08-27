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
import Events from 'app/components/Home';
import Communities from 'app/components/Communities';
import Notifications from 'app/components/Notifications';
import Settings from 'app/components/Settings';
import Login from 'app/components/Login';
import AuthLoadingScreen from 'app/components/AuthLoadingScreen';

const routes = {
  Notifications: {
    screen: Notifications,
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Notifications',
      tabBarIcon: ({tintColor}) => (
        <IconBadge MainElement={<MaterialIcons name={`notifications`} size={24} color={tintColor} />}
                   BadgeElement={
                     <Text style={{color: 'white'}}>
                       {(filter(screenProps.notifications, {viewed: false})).length}
                     </Text>
                   }
                   Hidden={(filter(screenProps.notifications, {viewed: false})).length === 0} />
      )
    })
  },
  Events: {
    screen: Events,
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Events',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name={`calendar-range`} size={24} color={tintColor} />
    })
  },
  Communities: {
    screen: Communities,
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Communities',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name={`account`} size={24} color={tintColor} />
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => <MaterialIcons name={`format-list-bulleted`} size={24} color={tintColor} />
    })
  },
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

export const MasterNavigator = StackNavigator(
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

const Router = ({dispatch, nav, notifications}) => (
  <MasterNavigator screenProps={{notifications}} navigation={{
    dispatch,
    state: nav,
    addListener: navigationListener
  }} />
);

export default connect(
  (state) => ({
    nav: state.nav,
    notifications: state.notifications.list
  })
)(Router);
