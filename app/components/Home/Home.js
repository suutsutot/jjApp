import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, Linking} from 'react-native'
import {Avatar} from 'react-native-elements'
import moment from 'moment'
import {refresh} from 'app/api/refreshTokenAPI';
import config from 'app/config';
import {HeaderSection} from 'app/pureComponents'

import { eventActions } from 'app/data/event'
import { userActions } from 'app/data/user'
import { notificationActions } from 'app/data/notification'

import styles from './styles'


export class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {loadData} = this.props;
        loadData();
    }

    goToEvent = (id) => {
        refresh().then((newToken) => {
            let url = config.client + '/redirect?type=event&id=' + id  + '&idToken=' + newToken.idToken + '&accessToken=' + newToken.accessToken;

            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            });
        });
    };

    renderEventList = () => {
        const {joinedEvents, managedEvents} = this.props;

        return <View>
            {
                joinedEvents.map((event, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.TouchableOpacityStyles]}
                        onPress={() => {this.goToEvent(event._id)}}
                    >
                        <View style={[styles.layoutRow]}>
                            <Avatar height={60} source={{uri: event.backgroundPic}}/>
                            <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                <View style={[styles.layoutRow]}>
                                    <Text style={styles.blackColorText}>{event.title ? event.title : event.activity.name}</Text>
                                    <Text style={styles.grayColorText}> on  {moment(event.eventDates.startDate).format('Do MMM')}</Text>
                                </View>
                                <View style={[styles.layoutColumn]}>
                                    <Text style={styles.grayColorText}>{event.activity.name}</Text>
                                    <Text style={[styles.grayColorText]}>{event.participants.length} participants</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>;
    };

    render() {
        return (
            <View>
                <HeaderSection title='Events'/>
                {this.renderEventList()}
            </View>
            )


    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        loadData: () => {
            dispatch(userActions.dbGetProfile());
            dispatch(eventActions.dbGetEventsList());
            // dispatch(notificationActions.dbGetNotifies());
            // dispatch(activityActions.dbGetActivitiesList());

        },
    }

};

const mapStateToProps = ({events}) => {
    const {info, loaded} = events;

    let joinedEvents = [];
    let managedEvents = [];
    if (loaded && info) {
        joinedEvents = info.joined;
        managedEvents = info.managed;
    }

    return {
        joinedEvents: joinedEvents ? joinedEvents : [],
        managedEvents: managedEvents ? managedEvents : [],
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home)
