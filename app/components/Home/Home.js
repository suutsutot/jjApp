import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Linking, ActivityIndicator, Image, ScrollView} from 'react-native';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import {refresh} from 'app/api/refreshTokenAPI';
import config from 'app/config';
import {HeaderSection} from 'app/pureComponents';
import {eventActions} from 'app/data/event';
import {userActions} from 'app/data/user';
import {notificationActions} from 'app/data/notification';
import {activityActions} from 'app/data/activity'
import styles from './styles';


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
            let url = config.client + '/redirect?type=event&id=' + id + '&idToken=' + newToken.idToken + '&accessToken=' + newToken.accessToken;

            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            });
        });
    };

    renderEventList = (events) => {
        return <View>
            {
                events.map((event, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.TouchableOpacityStyles]}
                        onPress={() => {
                            this.goToEvent(event._id)
                        }}
                    >
                        <View style={[styles.layoutRow]}>
                            {/*<Avatar overlayContainerStyle={{borderRadius: 50}} avatarStyle={{height: 60, width: 60, borderRadius: 50}} containerStyle={{height: 60, width: 60}}  source={{uri: event.backgroundPic}}/>*/}
                            <Image style={{ alignSelf: 'center', height: 60, width: 60, borderRadius: 50}} source={{uri: 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'}}/>
                            <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                                <View style={[styles.layoutRow]}>
                                    <Text
                                        style={styles.blackColorText}>{event.title ? event.title : event.activity.name}</Text>
                                    <Text style={styles.grayColorText}>
                                        {' on ' + moment(event.eventDates.startDate).format('Do MMM')}</Text>
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
        </View>
    };

    renderNoEvents = (type) => {
        if (type === 'recommended') return <View><Text>No one recommended events</Text></View>;
        else if (type === 'userList') return <View><Text>No one events</Text></View>;
    };

    renderRecommendedEvents = () => {
        const {recommendedEvents} = this.props;

        if (recommendedEvents.length > 0) return <View style={[styles.backgroundColorContentWhite, styles.shadowContainer, {marginBottom: 20}]}>
            <Text style={{margin: 10}}>{'Recommended events ' + recommendedEvents.length}</Text>
            {this.renderEventList(recommendedEvents)}
        </View>
    };

    renderUserEvents = () => {
        const {joinedEvents} = this.props;

        return <View style={[styles.backgroundColorContentWhite, styles.shadowContainer, {marginBottom: 20}]}>
            <Text style={{margin: 10}}>{'Events ' + joinedEvents.length}</Text>
            {
                joinedEvents.length > 0 ? this.renderEventList(joinedEvents) : this.renderNoEvents('userList')
            }
        </View>
    };

    renderEventScreen = () => {
        return <ScrollView>
            {this.renderRecommendedEvents()}
            {this.renderUserEvents()}
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
        const {loaded} = this.props;

        return (
            <View style={{flex: 1}}>
                <HeaderSection title='Events'/>
                {loaded ? this.renderEventScreen() : this.renderProcess()}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        loadData: () => {
            dispatch(userActions.dbGetProfile());
            dispatch(eventActions.dbGetEventsList());
            dispatch(eventActions.dbGetRecommendedEvents());
            // dispatch(notificationActions.dbGetNotifies());
            // dispatch(activityActions.dbGetActivitiesList());

        },
    }

};

const mapStateToProps = ({events}) => {
    const {userEvents, recommended} = events;

    let joinedEvents = [];
    let recommendedEvents = [];

    if (userEvents.loaded) {
        joinedEvents = userEvents.list;
    }

    if (recommended.loaded) {
        recommendedEvents = recommended.list;
    }

    let loaded = false;
    if (userEvents.loaded && recommended.loaded) loaded = true;

    return {
        joinedEvents: joinedEvents ? joinedEvents : [],
        recommendedEvents: recommendedEvents ? recommendedEvents : [],
        loaded
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home)
