import React, { Component } from 'react';
import { isNil, isEmpty, toUpper } from 'ramda';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  ActivityIndicator
} from 'react-native';
import { Avatar } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { compose, lifecycle } from 'recompose';

import { Button, HeaderSection } from 'src/pureComponents';
import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';

import styles from './styles';

export class Settings extends Component {
  onLogoutButton() {
    const { logout } = this.props;
    logout();
  }

  // goToProfile = id => {
  //   refresh().then(newToken => {
  //     let url =
  //       config.client +
  //       '/redirect?type=user&id=' +
  //       id +
  //       '&idToken=' +
  //       newToken.idToken +
  //       '&accessToken=' +
  //       newToken.accessToken;
  //     Linking.canOpenURL(url).then(supported => {
  //       if (supported) {
  //         Linking.openURL(url);
  //       } else {
  //         console.log("Don't know how to open URI: " + url);
  //       }
  //     });
  //   });
  // };

  goToProfile = (userId) => {
    this.props.navigation.navigate('UserProfile', { userId });
  };

  renderProfile = () => {
    const { name, avatar, userId } = this.props;
    console.log('avatar', avatar)

    return (
      <TouchableOpacity
        style={[
          styles.TouchableOpacityStyles,
          styles.backgroundColorContentWhite,
          styles.shadowContainer,
          { marginBottom: 20 }
        ]}
        onPress={() => this.goToProfile(userId)}
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
              overlayContainerStyle={{ borderRadius: 30 }}
              avatarStyle={{ height: 60, width: 60, borderRadius: 30 }}
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
                {i18n('go_to_profile')}
              </Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#78909c" />
        </View>
      </TouchableOpacity>
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
            <View style={styles.buttonsContainer}>
              <Button
                type="primary"
                buttonStyle={styles.actionButton}
                onPress={this.onLogoutButton.bind(this)}
              >
                {toUpper(i18n('log_out'))}
              </Button>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.containerProcess}>
            <View>
              <ActivityIndicator size="large" color="#00bcd4" />
            </View>
          </View>
        )}
      </View>
    );
  }
}

// Avatar.propTypes = {
//   ImageComponent: PropTypes.object
// }

export default compose(
  connect(
    ({ application, user }) => {
      const { error, loading, loggedIn } = application;
      const loaded = !isNil(user.profile) && !isEmpty(user.profile);
      const profile = user.profile;

      return {
        userId: user.userId,
        name:
          loaded && profile && profile.firstName && profile.lastName
            ? profile.firstName + ' ' + profile.lastName
            : user.email,
        avatar: loaded && profile ? profile.pic : '',
        loaded,
        error,
        loading,
        loggedIn
      };
    },
    (dispatch, ownProps) => {
      return {
        logout: () => dispatch(actions.authorization.logout()),
        fetchUserInfo: () => dispatch(actions.user.fetchUserProfile())
      };
    }
  ),
  lifecycle({
    componentDidMount() {
      const { fetchUserInfo } = this.props;
      fetchUserInfo();
    }
  })
)(Settings);
