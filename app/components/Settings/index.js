import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  Linking
} from 'react-native';
import { CardSection, Button, HeaderSection } from 'app/pureComponents';
import { Avatar } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import actions from 'app/data/actions';
import { refresh } from 'app/api/refreshTokenAPI';
import config from 'app/config';
import i18n from 'app/framework/i18n';

import styles from './styles';

export class Settings extends Component {
  onLogoutButton() {
    const { logout } = this.props;
    logout();
  }

  goToProfile = id => {
    refresh().then(newToken => {
      let url =
        config.client +
        '/redirect?type=user&id=' +
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

  renderProfile = () => {
    const { name, avatar, userId } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.TouchableOpacityStyles,
          styles.backgroundColorContentWhite,
          styles.shadowContainer,
          { marginBottom: 20 }
        ]}
        onPress={() => {
          this.goToProfile(userId);
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
            <Avatar
              overlayContainerStyle={{ borderRadius: 50 }}
              avatarStyle={{ height: 60, width: 60, borderRadius: 50 }}
              containerStyle={{ height: 60, width: 60 }}
              source={{ uri: avatar }}
            />
            <View
              style={[
                styles.layoutColumn,
                styles.leftPaddingText,
                styles.spaceBetweenText,
                styles.paddingClass
              ]}
            >
              <Text style={[styles.blackColorText, { fontSize: 16 }]}>
                {name}
              </Text>
              <Text style={[styles.grayColorText, { fontSize: 12 }]}>
                Go to Profile
              </Text>
            </View>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={styles.grayColorText}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderSchedule = () => {
    return (
      <View
        style={[
          styles.TouchableOpacityStyles,
          styles.backgroundColorContentWhite,
          styles.shadowContainer
        ]}
      >
        <Text>Schedule</Text>
        <View>
          <Text>Coming soon...</Text>
        </View>
      </View>
    );
  };

  renderButton() {
    return (
      <TouchableOpacity onPress={this.onLogoutButton.bind(this)}>
        <Text style={{ color: 'gray' }}>Logout</Text>
      </TouchableOpacity>
    );
  }

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
        <HeaderSection title={i18n('settings')} />
        {loaded ? (
          <ScrollView>
            {this.renderProfile()}
            {this.renderSchedule()}
            <View style={{ alignItems: 'center' }}>{this.renderButton()}</View>
          </ScrollView>
        ) : (
          this.renderProcess()
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(actions.authorization.dbLogout())
  };
};

const mapStateToProps = ({ global, user }) => {
  const { error, loading, loggedIn } = global;
  let loaded = user.loaded;
  let profile = {};
  if (user.loaded) profile = user.profile;

  return {
    userId: loaded && profile ? profile._id : null,
    name:
      loaded && profile && profile.firstName && profile.lastName
        ? profile.firstName + ' ' + profile.lastName
        : profile.email,
    avatar: loaded && profile ? profile.pic : '',
    loaded,
    error,
    loading,
    loggedIn
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
