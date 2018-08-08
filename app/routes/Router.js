import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import {Text} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import {addListener} from 'app/config/redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Events from 'app/components/Home';
import Communities from 'app/components/Communities';
import Notifications from 'app/components/Notifications';
import Settings from 'app/components/Settings';
import Login from 'app/components/Login';
// import Register from 'app/components/Register';
// import Wizard from 'app/components/Wizard';
import AuthLoadingScreen from 'app/components/AuthLoadingScreen';
import {filter} from 'lodash';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {HeaderSection} from 'app/pureComponents';

export const Tabs = createMaterialBottomTabNavigator({
    Notifications: {
        screen: Notifications,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarLabel: 'Notifications',
            tabBarIcon: ({tintColor}) => (
                <IconBadge
                    MainElement={<MaterialIcons name={`notifications`} size={24} color={tintColor}/>}
                    BadgeElement={<Text style={{color: 'white'}}>{(filter(screenProps.notifications, {viewed: false})).length}</Text>}
                    Hidden={(filter(screenProps.notifications, {viewed: false})).length === 0}
                />
            )

        })
    },
    Events: {
        screen: Events,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarLabel: 'Events',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons name={`calendar-range`} size={24} color={tintColor}/>
            )

        })
    },
    Communities: {
        screen: Communities,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarLabel: 'Communities',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons name={`account`} size={24} color={tintColor}/>
            )

        })
    },
    Settings: {
        screen: Settings,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => (
                <MaterialIcons name={`format-list-bulleted`} size={24} color={tintColor}/>
            )

        })
    },
}, {
    initialRouteName: 'Notifications',
    order: ['Notifications', 'Events', 'Communities', 'Settings'],
    activeTintColor: '#00bcd4',
    inactiveTintColor: 'gray',
    shifting: false,
    barStyle: {
        backgroundColor: '#fdfeff'
    }
});

// export const Tabs = TabNavigator(
//     {
//         Notifications: {screen: Notifications},
//         Events: {screen: Events},
//         Settings: {screen: Settings},
//     },
//     {
//         navigationOptions: ({navigation, screenProps}) => ({
//             tabBarIcon: ({focused, tintColor}) => {
//                 const {routeName} = navigation.state;
//
//                 let iconName;
//                 if (routeName === 'Events') {
//                     iconName = `event-note`;
//                 }
//                 else if (routeName === 'Notifications') {
//                     iconName = `notifications`;
//                 }
//                 else if (routeName === 'Settings') {
//                     iconName = `format-list-bulleted`;
//                 }
//
//                 if (routeName === 'Notifications') {
//                     return <IconBadge
//                         MainElement={<MaterialIcons name={iconName} size={24} color={tintColor}/>}
//                         BadgeElement={<Text style={{color: 'white'}}>{(filter(screenProps.notifications, {viewed: false})).length}</Text>}
//                         Hidden={(filter(screenProps.notifications, {viewed: false})).length === 0}
//                     />
//                 }
//                 else {
//                     return <MaterialIcons name={iconName} size={24} color={tintColor}/>;
//                 }
//
//             },
//             title: navigation.state,
//             headerLeft: null,
//             headerTitle: "Tab 1 Screen"
//         }),
//         tabBarOptions: {
//             showLabel: true,
//             activeTintColor: '#00bcd4',
//             inactiveTintColor: 'gray',
//         },
//         tabBarComponent: TabBarBottom,
//         tabBarPosition: 'bottom',
//         animationEnabled: false,
//         swipeEnabled: false,
//     }
// );

export const MasterNavigator = StackNavigator({AuthLoadingScreen, Tabs, Login}, {
    mode: 'modal',
    headerMode: 'none'
});

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
