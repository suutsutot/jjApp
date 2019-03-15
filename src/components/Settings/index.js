import React, { Component } from 'react';
import { isNil, isEmpty, toUpper } from 'ramda';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  RefreshControl
} from 'react-native';
import { Avatar } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { compose, lifecycle } from 'recompose';

import { Button, HeaderSection } from 'src/pureComponents';
import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';

import styles from './styles';

export class Settings extends Component {
  render() {
    const { loaded, name, avatar, userId, logout } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HeaderSection title={i18n('settings')} />
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#00bcd4']} refreshing={!loaded} />
          }
        >
          <TouchableOpacity
            style={[
              styles.TouchableOpacityStyles,
              styles.backgroundColorContentWhite,
              styles.shadowContainer,
              { marginBottom: 20 }
            ]}
            onPress={() =>
              userId &&
              this.props.navigation.navigate('UserProfile', { userId })
            }
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
          <View style={styles.buttonsContainer}>
            <Button
              type="primary"
              buttonStyle={styles.actionButton}
              onPress={logout}
            >
              {toUpper(i18n('log_out'))}
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default compose(
  connect(
    ({ user }) => {
      const loaded = !isNil(user.profile) && !isEmpty(user.profile);
      const profile = user.profile;

      return {
        userId: user.userId,
        name:
          loaded && profile && profile.firstName && profile.lastName
            ? profile.firstName + ' ' + profile.lastName
            : user.email,
        avatar: loaded && profile ? profile.pic : '',
        loaded
      };
    },
    dispatch => {
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
