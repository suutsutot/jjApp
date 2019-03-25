import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { isEmpty, isNil, compose } from 'ramda';

import withBackHandler from 'src/hocs/withBackHandler';
import { HeaderSection } from 'src/pureComponents/HeaderSection';
import { ArrowBackIcon } from 'src/pureComponents/ArrowBackIcon';
import { getUserData } from 'src/api/userApi';
import i18n from 'src/framework/i18n';
import actions from 'src/data/actions';

import styles from './styles';

class UserProfile extends Component {
  state = {
    refreshing: false
  };

  componentDidMount() {
    const { loaded } = this.props;
    !loaded && this.setState({ refreshing: true });
    this.fetchUserData();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchUserData();
  };

  fetchUserData() {
    const userId = this.props.navigation.state.params.userId;
    getUserData(userId).then(data => {
      this.props.setUserProfile(data.user);
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { profile, loaded, navigation } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={styles.container}>
        <HeaderSection
          leftComponent={<ArrowBackIcon onPress={() => navigation.goBack()} />}
          title={i18n('profile')}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={['#00bcd4']}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {loaded && (
            <View style={styles.mainContent}>
              <Avatar
                size="xlarge"
                rounded
                containerStyle={{ marginBottom: 10 }}
                source={{ uri: profile.pic }}
              />
              <Text style={styles.nameBlock}>
                {profile.firstName + ' ' + profile.lastName}
              </Text>
              <Text>
                <Text style={styles.textBlock}>{i18n('city')} </Text>
                <Text style={styles.blackTextBlock}>
                  {profile.location.details.city ||
                    profile.location.details.state}
                </Text>
              </Text>
              <Text>
                <Text style={styles.textBlock}>{i18n('gender')} </Text>
                <Text style={styles.blackTextBlock}>
                  {i18n(profile.gender)}
                </Text>
              </Text>
              <Text>
                <Text style={styles.textBlock}>{i18n('age')} </Text>
                <Text style={styles.blackTextBlock}>
                  {moment().diff(profile.birthday, 'years', false)}
                </Text>
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default compose(
  connect(
    ({ user }) => ({
      loaded: !isNil(user.profile) && !isEmpty(user.profile),
      profile: user.profile
    }),
    {
      setUserProfile: actions.user.setUserProfile
    }
  ),
  withBackHandler(({ navigation }) => navigation.goBack())
)(UserProfile);
