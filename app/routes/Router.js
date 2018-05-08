import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TabNavigator, StackNavigator, TabBarBottom, SwitchNavigator} from 'react-navigation'

import {addListener} from '../config/redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from './../components/Home'
import Profile from './../components/Profile'
import Notifications from './../components/Notifications'
import Settings from './../components/Settings'

import Login from './../components/Login'
import Wizard from './../components/Wizard'

import AuthLoadingScreen from './../components/AuthLoadingScreen'

export const Tabs = TabNavigator(
    {
        Home: {screen: Home},
        Profile: {screen: Profile},
        Notifications: {screen: Notifications},
        Settings: {screen: Settings},
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
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

const AppStack = StackNavigator({Tabs, Login}, {
    mode: 'modal',
    headerMode: 'none'
});
const AuthStack = StackNavigator({Login, Wizard, Tabs}, {
    mode: 'modal',
    headerMode: 'none'
});

export const MasterNavigator = SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
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
