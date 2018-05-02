// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity} from 'react-native'
import {Avatar} from 'react-native-elements'
import moment from 'moment'

import Header from './../Header'

// - Import Actions
import * as userActions from './../../actions/userActions'
import * as notifyActions from './../../actions/notifyActions'
import * as eventActions from './../../actions/eventActions'
import * as activityActions from './../../actions/activityActions'

// - Import component styles 
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

    _onSelect = (event) => {

    };

    renderEventList = () => {
        const {joinedEvents, managedEvents} = this.props;
        // console.log('events123', events);

        return <View>
            {
                joinedEvents.map((event, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.TouchableOpacityStyles]}
                        onPress={() => {this._onSelect(event)}}
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
                {this.renderEventList()}
            </View>
            )


    }
}

// - Map dispatch to props
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
    console.log('infoqqq', loaded,  info)
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