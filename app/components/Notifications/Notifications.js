import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import {ListItem, Avatar} from 'react-native-elements';
import Header from './../Header'
import moment from 'moment'
import forEach from 'lodash/forEach'

import styles from './styles'


export class Notifications extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    _onSelect = (notification) => {

    };

    renderNotifications = (viewedNotifications, newNotifications) => {
        const {notifications} = this.props;
        return <ScrollView>
            {/* NEW NOTIFICATIONS*/}
            {
                newNotifications && newNotifications.length !== 0 ?
                    <View style={[styles.layoutRow, styles.leftPaddingText, {marginTop: 10, marginBottom: 10}]}>
                        <Text style={styles.grayColorText}>NEW</Text>
                    </View> : null
            }
            {
                newNotifications && newNotifications.length !== 0 ? newNotifications.map((notification, i) => {
                    if (notification.type === 'eventInvitation') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === newNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this._onSelect(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                <Avatar height={40} source={{uri: notification.details.pic}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text
                                            style={styles.blackColorText}>{notification.details.name ? notification.details.name : notification.details.activity.name}</Text>
                                        <Text style={styles.grayColorText}>
                                            on {moment(notification.details.date).format('Do MMM')}</Text>
                                    </View>
                                    <View style={[styles.layoutRow]}>
                                        <Text style={styles.blackColorText}>{notification.creatorName}</Text>
                                        <Text style={[styles.grayColorText]}> invites you to this event</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'communityInvitation') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'friendRequest') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'friendAccept') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'Comments') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'oneTimeEventCreate' || notification.type === 'repeatedEventCreate') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                }) : null
            }


            {/* VIEWED NOTIFICATIONS*/}
            {
                viewedNotifications && viewedNotifications.length !== 0 ?
                    <View style={[styles.layoutRow, styles.leftPaddingText, {marginTop: 10, marginBottom: 10}]}>
                        <Text style={styles.grayColorText}>VIEWED</Text>
                    </View> : null
            }
            {
                viewedNotifications && viewedNotifications.length !== 0 ? viewedNotifications.map((notification, i) => {
                    if (notification.type === 'eventInvitation') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === viewedNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this._onSelect(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                <Avatar height={40} source={{uri: notification.details.pic}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text
                                            style={styles.blackColorText}>{notification.details.name ? notification.details.name : notification.details.activity.name}</Text>
                                        <Text style={styles.grayColorText}>
                                            on {moment(notification.details.date).format('Do MMM')}</Text>
                                    </View>
                                    <View style={[styles.layoutRow]}>
                                        <Text style={styles.blackColorText}>{notification.creatorName}</Text>
                                        <Text style={[styles.grayColorText]}> invites you to this event</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'communityInvitation') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'friendRequest') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'friendAccept') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'Comments') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                    else if (notification.type === 'oneTimeEventCreate' || notification.type === 'repeatedEventCreate') {
                        return <ListItem
                            key={i}
                            roundAvatar
                            avatar={{uri: notification.details.pic}}
                            title={notification.details.name}
                        />
                    }
                }) : null
            }

            <View style={[styles.layoutRow, styles.backgroundColorContentGray, {justifyContent: 'center'}]}>
                <Text style={[styles.grayColorText, styles.marginFooter]}>{notifications.length} notifications</Text>
            </View>
        </ScrollView>
    };

    render() {
        const {notifications} = this.props;
        let viewedNotifications = [];
        let newNotifications = [];

        forEach(notifications, function (notification) {
            if (notification.viewed === true) {
                viewedNotifications.push(notification)
            }
            else {
                newNotifications.push(notification)
            }
        });

        return (
            <View style={[styles.backgroundColorContentWhite]}>
                <Header title={'Notifications'}/>

                {this.renderNotifications(viewedNotifications, newNotifications)}

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {}

};

const mapStateToProps = (state, ownProps) => {

    let notifications;
    if (state.notifications.loaded && state.notifications.userNotifies) notifications = state.notifications.userNotifies;

    return {
        notifications
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
