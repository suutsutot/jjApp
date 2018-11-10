import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import moment from 'moment';
import { refresh } from 'app/api/refreshTokenAPI';
import config from 'app/config';
import { HeaderSection } from 'app/pureComponents';
import { eventActions } from 'app/data/event';
import { userActions } from 'app/data/user';
import { activityActions } from 'app/data/activity';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export class Events extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { loadData } = this.props;
    loadData();
  }

  goToEvent = id => {
    refresh().then(newToken => {
      let url =
        config.client +
        '/redirect?type=event&id=' +
        id +
        '&idToken=' +
        newToken.idToken +
        '&accessToken=' +
        newToken.accessToken;

      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    });
  };

  renderEventList = events => {
    return (
      <View>
        {events.map((event, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.TouchableOpacityStyles]}
            onPress={() => {
              this.goToEvent(event._id);
            }}
          >
            <View
              style={[
                styles.layoutRow,
                styles.spaceBetweenText,
                { flex: 1, alignItems: 'center' }
              ]}
            >
              <View style={[styles.layoutRow]}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    resizeMode: 'cover'
                  }}
                  source={{ uri: event.backgroundPic }}
                />
                <View style={[styles.layoutColumn, styles.leftPaddingText]}>
                  <View style={[styles.layoutRow]}>
                    <Text style={styles.blackColorText}>
                      {event.title ? event.title : event.activity.name}
                    </Text>
                    <Text style={styles.grayColorText}>
                      {' on ' +
                        moment(event.eventDates.startDate).format('Do MMM')}
                    </Text>
                  </View>
                  <View style={[styles.layoutColumn]}>
                    <Text style={styles.grayColorText}>
                      {event.activity.name}
                    </Text>
                    <Text style={[styles.grayColorText]}>
                      {event.participants.length + ' participants'}
                    </Text>
                  </View>
                </View>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={styles.grayColorText}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  renderNoEvents = type => {
    if (type === 'userList')
      return (
        <View style={[{ marginVertical: 20, alignItems: 'center' }]}>
          <Text>No one events</Text>
        </View>
      );
    // else if (type === 'recommended') return <View style={styles.TouchableOpacityStyles}><Text>No one recommended events</Text></View>;
  };

  renderNewEvent = () => {
    const { newEventsList } = this.props;

    return (
      <View
        style={[
          styles.backgroundColorContentWhite,
          styles.shadowContainer,
          { marginBottom: 20 }
        ]}
      >
        <View style={[styles.layoutRow, { margin: 10 }]}>
          <Text style={styles.blackColorText}>{'New events '}</Text>
          <Text style={styles.grayColorText}>{newEventsList.length}</Text>
        </View>
        {this.renderEventList(newEventsList)}
      </View>
    );
  };

  renderUserEvents = () => {
    const { joinedEvents } = this.props;

    return (
      <View
        style={[
          styles.backgroundColorContentWhite,
          styles.shadowContainer,
          { marginBottom: 30 }
        ]}
      >
        <View style={[styles.layoutRow, { margin: 10 }]}>
          <Text style={styles.blackColorText}>{'Events '}</Text>
          <Text style={styles.grayColorText}>{joinedEvents.length}</Text>
        </View>
        {joinedEvents.length > 0
          ? this.renderEventList(joinedEvents)
          : this.renderNoEvents('userList')}
      </View>
    );
  };

  renderEventScreen = () => {
    const { newEventsList } = this.props;
    return (
      <ScrollView>
        {newEventsList.length > 0 ? this.renderNewEvent() : null}
        {this.renderUserEvents()}
      </ScrollView>
    );
  };

  renderProcess = () => {
    return (
      <View style={styles.containerProcess}>
        <View>
          <ActivityIndicator size="large" color="#00bcd4" />
        </View>
      </View>
    );
  };

  render() {
    const { loaded } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <HeaderSection title="Events" />
        {loaded ? this.renderEventScreen() : this.renderProcess()}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: () => {
      dispatch(userActions.dbGetProfile());
      dispatch(eventActions.dbGetEventsList());
    }
  };
};

const mapStateToProps = ({ events }) => {
  const { userEvents, newEvents } = events;

  let joinedEvents = [];
  let newEventsList = [];

  if (userEvents.loaded) joinedEvents = userEvents.list;

  if (newEvents.loaded) newEventsList = newEvents.list;

  let loaded = false;
  if (userEvents.loaded && newEvents.loaded) loaded = true;

  return {
    joinedEvents: joinedEvents ? joinedEvents : [],
    newEventsList: newEventsList ? newEventsList : [],
    loaded
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
