import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, AsyncStorage, Linking} from 'react-native'
import {Avatar} from 'react-native-elements'
import moment from 'moment'

const getToken = () => AsyncStorage.getItem("idToken");

import Header from './../Header'

import * as userActions from './../../actions/userActions'
import * as notifyActions from './../../actions/notifyActions'
import * as eventActions from './../../actions/eventActions'

import styles from './styles'


export class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {loadData} = this.props;
        loadData();
    }

    componentDidMount() {
    }

    goToEvent = (id) => {
        getToken().then((token) => {
            // let url = 'http://justjoin1.ru/redirect?type=event&id=' + id + '&token=' + token;
            let url = 'http://justjoin1.ru/events/'+ id + '/information';
            console.log('url', url);

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
                            <Avatar height={60} source={{uri: event.backgroundPic ? event.backgroundPic : 'https://static-cdn.jtvnw.net/jtv_user_pictures/welovegames-profile_image-15afef2e74a108da-70x70.png'}}/>
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
                <Header title='Events'/>
                <TouchableOpacity onPress={this.goToEvent}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Open</Text>
                    </View>
                </TouchableOpacity>
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
            dispatch(notifyActions.dbGetNotifies());

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
