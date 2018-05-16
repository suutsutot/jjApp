import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TabNavigator, StackNavigator, TabBarBottom, SwitchNavigator} from 'react-navigation'
import {Text} from 'react-native'
import IconBadge from 'react-native-icon-badge';

import {addListener} from 'app/config/redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from 'app/components/Home'
import Profile from 'app/components/Profile'
import Notifications from 'app/components/Notifications'
import Settings from 'app/components/Settings'

import Login from 'app/components/Login'
import Wizard from 'app/components/Wizard'

import AuthLoadingScreen from 'app/components/AuthLoadingScreen'

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
                console.log('navigation222', navigation.state)
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

                if (routeName === 'Notifications') {
                    return <IconBadge
                        MainElement={<MaterialIcons name={iconName} size={35} color={tintColor}/>}
                        BadgeElement={<Text style={{ color: 'white' }}>5</Text>}
                        // Hidden={notifications === 0}
                    />
                }
                else {
                    return <MaterialIcons name={iconName} size={25} color={tintColor}/>;
                }

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
