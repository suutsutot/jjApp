// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    TabNavigator,
    StackNavigator,
    TabBarBottom,
    SwitchNavigator
} from 'react-navigation'

import { addListener } from '../config/redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// - Import app components
import Home from './../components/Home'
import Search from './../components/Search'
import Profile from './../components/Profile'
import Notifications from './../components/Notifications'
import Settings from './../components/Settings'

import Login from './../components/Login'
import Wizard from './../components/Wizard'

import AuthLoadingScreen from './../components/AuthLoadingScreen'

export const Tabs = TabNavigator(
    {
        Home: {screen: Home},
        // Search: {screen: Search},
        Profile: {screen: Profile},
        Notifications: {screen: Notifications},
        Settings: {screen: Settings},

        // in next versions
        // Messages: { screen: Messages },
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
                }
                else if (routeName === 'Search') {
                    iconName = `search`;
                }
                else if (routeName === 'Profile') {
                    iconName = `account-circle`;
                }
                else if (routeName === 'Notifications') {
                    iconName = `notifications`;
                }
                else if (routeName === 'Settings') {
                    iconName = `format-list-bulleted`;
                }
                // in next versions
                else if (routeName === 'Messages') {
                    iconName = `chat`;
                }

                return <MaterialIcons name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#00bcd4',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);

// const AppStack = StackNavigator({ Tabs: Tabs}, {
//     mode: 'modal',
//     headerMode: 'none'
// });
const AuthStack = StackNavigator({ Login: Login, Wizard: Wizard, Tabs: Tabs }, {
    mode: 'modal',
    headerMode: 'none'
});

export const MasterNavigator = SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: Tabs,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

const Router = ({dispatch, nav}) => (
    <MasterNavigator navigation={{
        dispatch,
        state: nav,
        addListener,
    }}/>
);

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(Router)