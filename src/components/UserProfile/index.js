import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment'

import { HeaderSection } from 'src/pureComponents';
import config from 'src/config';
import request from 'src/api/request';
import i18n from 'src/framework/i18n';

import styles from './styles';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loaded: false,
      refreshing: false
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchUserData();
  }

  fetchUserData() {
    const userId = this.props.navigation.state.params.userId;
    request(`${config.server}/api/users/profile/${userId}`, {
      method: 'GET'
    }).then(user => this.setState({ user, loaded: true, refreshing: false }))
  }

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    const { user } = this.state.user

    return (
      <ScrollView
        refreshControl={<RefreshControl
          colors={["#00bcd4"]}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh} />}>
        <View>
          <HeaderSection
            leftComponent={<MaterialIcons
              onPress={() => this.props.navigation.goBack()}
              name="arrow-back"
              style={styles.materialIconBackStyle} />}
            title={i18n('profile')} />
          <View style={styles.mainContent}>
            {this.state.loaded && <Fragment>
              <Avatar size="xlarge" rounded containerStyle={{ margin: 10 }} source={{ uri: user.pic }} />
              <Text style={styles.nameBlock}>{user.firstName + ' ' + user.lastName}</Text>
              <Text>
                <Text style={styles.textBlock}>{i18n('city')} </Text>
                <Text style={styles.blackTextBlock}>{user.location.details.city || user.location.details.state}</Text>
              </Text>
              <Text>
                <Text style={styles.textBlock}>{i18n('gender')} </Text>
                <Text style={styles.blackTextBlock}>{i18n(user.gender)}</Text>
              </Text>
              <Text>
                <Text style={styles.textBlock}>{i18n('age')} </Text>
                <Text style={styles.blackTextBlock}>{moment().diff(user.birthday, 'years', false)}</Text>
              </Text>
            </Fragment>}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default UserProfile;