import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TabNavigator, StackNavigator, TabBarBottom, SwitchNavigator} from 'react-navigation'
import {Text} from 'react-native'
import IconBadge from 'react-native-icon-badge';
import {addListener} from 'app/config/redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from 'app/components/Home'
// import Profile from 'app/components/Profile'
import Notifications from 'app/components/Notifications'
import Settings from 'app/components/Settings'
import Login from 'app/components/Login'
import Wizard from 'app/components/Wizard'
import AuthLoadingScreen from 'app/components/AuthLoadingScreen'

export const Tabs = TabNavigator(
    {
        Home: {screen: Home},
        // Profile: {screen: Profile},
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
                // else if (routeName === 'Profile') {
                //     iconName = `account-circle`;
                // }
                else if (routeName === 'Notifications') {
                    iconName = `notifications`;
                }
                else if (routeName === 'Settings') {
                    iconName = `format-list-bulleted`;
                }

                if (routeName === 'Notifications') {
                    return <IconBadge
                        MainElement={<MaterialIcons name={iconName} size={35} color={tintColor}/>}
                        BadgeElement={<Text style={{ color: 'white' }}>{screenProps.notifications.length}</Text>}
                        Hidden={screenProps.notifications.length === 0}
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

const AppStack = StackNavigator({Wizard, Tabs, Login}, {
    mode: 'modal',
    headerMode: 'none'
});
const AuthStack = StackNavigator({Login, Wizard, Tabs}, {
    mode: 'modal',
    headerMode: 'none'
});


// const AppStack = StackNavigator({Tabs, Wizard}, {
//     mode: 'modal',
//     headerMode: 'none'
// });
// const AuthStack = StackNavigator({Login}, {
//     mode: 'modal',
//     headerMode: 'none'
// });

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
    <MasterNavigator screenProps={{ notifications }} navigation={{
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
