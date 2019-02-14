import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';

import { HeaderSection } from 'src/pureComponents/HeaderSection';
import { ArrowBackIcon } from 'src/pureComponents/ArrowBackIcon';
import { userData } from 'src/api/userApi';
import i18n from 'src/framework/i18n';
import actions from 'src/data/actions';

import styles from './styles';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loaded: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchUserData();
  };

  fetchUserData() {
    const userId = this.props.navigation.state.params.userId;
    userData(userId).then(user => {
      this.props.setUserProfile(user);
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { user } = this.props.user.user;

    return (
      <View>
        <HeaderSection
          leftComponent={
            <ArrowBackIcon onPress={() => this.props.navigation.goBack()} />
          }
          title={i18n('profile')}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={['#00bcd4']}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={styles.mainContent}>
            {user && (
              <Fragment>
                <Avatar
                  size="xlarge"
                  rounded
                  containerStyle={{ margin: 10 }}
                  source={{ uri: user.pic }}
                />
                <Text style={styles.nameBlock}>
                  {user.firstName + ' ' + user.lastName}
                </Text>
                <Text>
                  <Text style={styles.textBlock}>{i18n('city')} </Text>
                  <Text style={styles.blackTextBlock}>
                    {user.location.details.city || user.location.details.state}
                  </Text>
                </Text>
                <Text>
                  <Text style={styles.textBlock}>{i18n('gender')} </Text>
                  <Text style={styles.blackTextBlock}>{i18n(user.gender)}</Text>
                </Text>
                <Text>
                  <Text style={styles.textBlock}>{i18n('age')} </Text>
                  <Text style={styles.blackTextBlock}>
                    {moment().diff(user.birthday, 'years', false)}
                  </Text>
                </Text>
              </Fragment>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    setUserProfile: user => dispatch(actions.user.setUserProfile(user))
  })
)(UserProfile);
