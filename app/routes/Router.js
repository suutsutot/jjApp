import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TabNavigator, StackNavigator, TabBarBottom, SwitchNavigator} from 'react-navigation';
import {Text} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import {addListener} from 'app/config/redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from 'app/components/Home';
import Notifications from 'app/components/Notifications';
import Settings from 'app/components/Settings';
import Login from 'app/components/Login';
import Register from 'app/components/Register';
import Wizard from 'app/components/Wizard';
import AuthLoadingScreen from 'app/components/AuthLoadingScreen';
import {filter} from 'lodash';

export const Tabs = TabNavigator(
    {
        Home: {screen: Home},
        Notifications: {screen: Notifications},
        Settings: {screen: Settings},
    },
    {
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;

                let iconName;
                if (routeName === 'Home') {
                    iconName = `event-note`;
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
                        BadgeElement={<Text style={{color: 'white'}}>{(filter(screenProps.notifications, {viewed: false})).length}</Text>}
                        Hidden={(filter(screenProps.notifications, {viewed: false})).length === 0}
                    />
                }
                else {
                    return <MaterialIcons name={iconName} size={35} color={tintColor}/>;
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

const AppStack = StackNavigator({Tabs, Login, Wizard, Register}, {
    mode: 'modal',
    headerMode: 'none'
});
const AuthStack = StackNavigator({Login, Wizard, Register, Tabs}, {
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

const Router = ({dispatch, nav, notifications}) => (
    <MasterNavigator screenProps={{notifications}} navigation={{
        dispatch,
        state: nav,
        addListener
    }}/>
);

const mapStateToProps = state => {
    const {nav, notifications} = state;

    return {
        nav,
        notifications: notifications.userNotifies
    }
};

export default connect(mapStateToProps)(Router)
