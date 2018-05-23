import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, View, Text, TouchableOpacity, AppState, Picker, Platform, AsyncStorage, Linking, Image, ActivityIndicator} from 'react-native'
import {HeaderSection} from 'app/pureComponents'
import moment from 'moment'
import forEach from 'lodash/forEach'
import config from 'app/config';
import {refresh} from 'app/api/refreshTokenAPI';
import styles from './styles'


export class Notifications extends Component {
    constructor(props) {
        super(props);

    }

    redirectToWeb = (notification) => {
        refresh().then((newToken) => {
            let url;

            if (notification.type === 'eventInvitation' || notification.type === 'oneTimeEventCreate' || notification.type === 'repeatedEventCreate') {
                url = config.server + '/redirect?type=event&id=' + notification.creatorId + '&idToken=' + newToken.idToken + '&accessToken=' + newToken.accessToken;
            }
            else if (notification.type === 'communityInvitation') {
                url = config.server + '/redirect?type=community&id=' + notification.creatorId + '&idToken=' + newToken.idToken + '&accessToken=' + newToken.accessToken;
            }
            else if (notification.type === 'friendRequest' || notification.type === 'friendAccept') {
                url = config.server + '/redirect?type=user&id=' + notification.creatorId + '&idToken=' + newToken.idToken + '&accessToken=' + newToken.accessToken;
            }
            else if (notification.type === 'Comments') {

            }

            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            });
        });
    };

    renderNewNotificationsList = (newNotifications) => {
        return <View style={[styles.backgroundColorContentWhite, styles.shadowContainer, {marginBottom: 20}]}>
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
                                this.redirectToWeb(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text
                                            style={styles.blackColorText}>{notification.details.name ? notification.details.name : notification.details.activity.name}</Text>
                                        <Text style={styles.grayColorText}>
                                            {' on ' + moment(notification.details.date).format('Do MMM')}</Text>
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
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === newNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this.redirectToWeb(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                    </View>
                                    <View style={[styles.layoutRow]}>
                                        <Text style={styles.blackColorText}>{notification.creatorName}</Text>
                                        <Text style={[styles.grayColorText]}> invites you to this community</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'friendRequest') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === newNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this.redirectToWeb(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> following you</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'friendAccept') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === newNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this.redirectToWeb(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> following you</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'Comments') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === newNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this.redirectToWeb(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> wrote comment</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'oneTimeEventCreate' || notification.type === 'repeatedEventCreate') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === newNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this.redirectToWeb(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text
                                            style={styles.blackColorText}>{notification.details.name ? notification.details.name : notification.details.activity.name}</Text>
                                        <Text style={styles.grayColorText}>
                                            {' on ' + moment(notification.details.date).format('Do MMM')}</Text>
                                    </View>
                                    <View style={[styles.layoutRow]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> invites you to this event</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                }) : null
            }
        </View>
    };

    renderViewedNotificationsList = (viewedNotifications) => {
        return <View style={[styles.backgroundColorContentWhite, styles.shadowContainer, {marginBottom: 20}]}>
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
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text
                                            style={styles.blackColorText}>{notification.details.name ? notification.details.name : notification.details.activity.name}</Text>
                                        <Text style={styles.grayColorText}>
                                            {' on ' + moment(notification.details.date).format('Do MMM')}</Text>
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
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === viewedNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this._onSelect(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                    </View>
                                    <View style={[styles.layoutRow]}>
                                        <Text style={styles.blackColorText}>{notification.creatorName}</Text>
                                        <Text style={[styles.grayColorText]}> invites you to this community</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'friendRequest') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === viewedNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this._onSelect(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> following you</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'friendAccept') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === viewedNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this._onSelect(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> following you</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'Comments') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === viewedNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this._onSelect(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> wrote comment</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    else if (notification.type === 'oneTimeEventCreate' || notification.type === 'repeatedEventCreate') {
                        return <TouchableOpacity
                            key={i}
                            style={[styles.TouchableOpacityStyles, (i === viewedNotifications.length - 1) ? styles.marginBottom : null]}
                            onPress={() => {
                                this._onSelect(notification)
                            }}
                        >
                            <View style={[styles.layoutRow]}>
                                {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 40, width: 40, borderRadius: 50}} containerStyle={{height: 40, width: 40}} source={{uri: notification.details.pic}}/>*/}
                                <Image style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                    <View style={[styles.layoutRow, {flex: 1}]}>
                                        <Text
                                            style={styles.blackColorText}>{notification.details.name ? notification.details.name : notification.details.activity.name}</Text>
                                        <Text style={styles.grayColorText}>
                                            {' on ' + moment(notification.details.date).format('Do MMM')}</Text>
                                    </View>
                                    <View style={[styles.layoutRow]}>
                                        <Text style={styles.blackColorText}>{notification.details.name}</Text>
                                        <Text style={[styles.grayColorText]}> invites you to this event</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                }) : null
            }
        </View>
    };

    renderNotifications = (viewedNotifications, newNotifications) => {
        const {notifications} = this.props;
        return <ScrollView>
            {newNotifications ? this.renderNewNotificationsList(newNotifications) : null}
            {viewedNotifications ? this.renderViewedNotificationsList(viewedNotifications) : null}

            <View style={[styles.layoutRow, styles.backgroundColorContentGray, {justifyContent: 'center'}]}>
                <Text style={[styles.grayColorText, styles.marginFooter]}>{notifications.length} notifications</Text>
            </View>
        </ScrollView>
    };

    renderProcess = () => {
        return <View style={styles.containerProcess}>
            <View>
                <ActivityIndicator size="large" color="#00bcd4"/>
            </View>
        </View>
    };

    render() {
        const {notifications, loaded} = this.props;
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
            <View style={{flex: 1}}>
                <HeaderSection title={'Notifications'}/>
                {loaded ? this.renderNotifications(viewedNotifications, newNotifications) : this.renderProcess()}
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const mapStateToProps = (state, ownProps) => {
    let loaded = state.notifications.loaded;

    let notifications;
    if (loaded && state.notifications.userNotifies) notifications = state.notifications.userNotifies;

    return {
        notifications,
        loaded
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
