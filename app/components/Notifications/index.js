import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { lifecycle } from 'recompose';
import {
  View,
  Text,
  Linking,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { HeaderSection } from 'app/pureComponents';
import config from 'app/config';
import { refresh } from 'app/api/refreshTokenAPI';
import actions from 'app/data/actions';

import styles from './styles';

const Touchable = ({children, onPress, style}) => (
  <TouchableOpacity onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const PrimaryText = ({children}) => (
  <Text style={styles.blackColorText}>{children}</Text>
);

const SecondaryText = ({children}) => (
  <Text style={styles.grayColorText}>{children}</Text>
);

const NotificationIcon = ({source}) => (
  <Image style={styles.notificationIcon} source={source}/>
);

const Notification = ({ onPress, imageSource, firstRow, secondRow }) => (
  <Touchable /*onPress={onPress}*/>
    <View style={StyleSheet.flatten([styles.container, styles.layoutRow])}>
      <NotificationIcon source={imageSource}/>
      <View style={[styles.layoutColumn, styles.leftPaddingText]}>
        <View style={[styles.layoutRow, {flex: 1}]}>
          {firstRow}
        </View>
        <View style={[styles.layoutRow]}>
          {secondRow}
        </View>
      </View>
    </View>
  </Touchable>
);

const getNotificationComponent = (name) => ({notification, onPress}) => {
  switch (name) {
    case 'eventInvitation':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.event.miniaturePic || notification.event.backgroundPic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.event.title || notification.event.activity.name}</PrimaryText>
                          <SecondaryText>on {moment(notification.event.eventDates.startDate).format('Do MMM')}</SecondaryText>
                        </Fragment>
                      )}
                      secondRow={(
                        <Fragment>
                          <PrimaryText>{notification.creatorName}</PrimaryText>
                          <SecondaryText>invites you to this event</SecondaryText>
                        </Fragment>
                      )} />
      );
    case 'communityInvitation':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.community.miniaturePic || notification.community.backgroundPic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.community.title}</PrimaryText>
                        </Fragment>
                      )}
                      secondRow={(
                        <Fragment>
                          <PrimaryText>{notification.creatorName}</PrimaryText>
                          <SecondaryText>invites you to this community</SecondaryText>
                        </Fragment>
                      )} />
      );
    case 'friendRequest':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.user.pic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.user.firstName}{' '}{notification.user.lastName}</PrimaryText>
                          <SecondaryText>following you</SecondaryText>
                        </Fragment>
                      )} />
      );
    case 'friendAccept':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.user.pic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.user.firstName}{' '}{notification.user.lastName}</PrimaryText>
                          <SecondaryText>is accepting your request</SecondaryText>
                        </Fragment>
                      )} />
      );
    case 'communityComment':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.community.miniaturePic || notification.community.backgroundPic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.community.title}</PrimaryText>
                          <SecondaryText>wrote comment</SecondaryText>
                        </Fragment>
                      )}
                      secondRow={(
                        <Fragment>
                          <Text>{notification.details.text}</Text>
                        </Fragment>
                      )} />
      );
    case 'eventComment':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.event.miniaturePic || notification.event.backgroundPic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.event.title || notification.event.activity.name}</PrimaryText>
                          <SecondaryText>wrote comment</SecondaryText>
                        </Fragment>
                      )}
                      secondRow={(
                        <Fragment>
                          <Text>{notification.details.text}</Text>
                        </Fragment>
                      )} />
      );
    case 'userComment':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.user.pic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.user.firstName}{' '}{notification.user.lastName}</PrimaryText>
                          <SecondaryText>wrote comment</SecondaryText>
                        </Fragment>
                      )}
                      secondRow={(
                        <Fragment>
                          <Text>{notification.details.text}</Text>
                        </Fragment>
                      )} />
      );
    case 'oneTimeEventCreate':
    case 'repeatedEventCreate':
      return (
        <Notification onPress={() => onPress(notification)}
                      imageSource={{uri: notification.community.miniaturePic || notification.community.backgroundPic}}
                      firstRow={(
                        <Fragment>
                          <PrimaryText>{notification.details.eventName}</PrimaryText>
                          <SecondaryText>on {moment(notification.details.date).format('Do MMM')}</SecondaryText>
                        </Fragment>
                      )}
                      secondRow={(
                        <Fragment>
                          <PrimaryText>{notification.community.title}</PrimaryText>
                          <SecondaryText>invites you to this event</SecondaryText>
                        </Fragment>
                      )} />
      )
  }
};

const Progress = () => (
  <View style={styles.containerProcess}>
    <View>
      <ActivityIndicator size="large" color="#00bcd4" />
    </View>
  </View>
);

const EmptyResults = () => (
  <View style={[styles.containerProcess]}>
    <MaterialIcons name={'notifications-none'} size={48}/>
    <Text>You do not have any notifications yet.</Text>
  </View>
);

const getRedirectType = (notification) => {
  if (notification.type === 'eventInvitation' || notification.type === 'oneTimeEventCreate' || notification.type === 'repeatedEventCreate') {
    return 'event';
  } else if (notification.type === 'communityInvitation') {
    return 'community';
  } else if (notification.type === 'friendRequest' || notification.type === 'friendAccept') {
    return 'user';
  }

  return '';
};

const redirectToWeb = async (notification) => {
  const newToken = await refresh();

  const redirectType = getRedirectType(notification);
  const { accessToken, idToken } = newToken;
  const { creatorId } = notification;

  const url = `${config.server}/redirect?type=${redirectType}&idToken=${idToken}&accessToken=${accessToken}`;
  const supported = await Linking.canOpenURL(url);
  supported && Linking.openURL(url);
};

const Notifications = ({ notifications, pending, fetchList }) => (
  <FlatList data={notifications}
            renderItem={({ item: notification }) => {
              const Component = getNotificationComponent(notification.type);
              return <Component notification={notification}
                                onPress={() => redirectToWeb(notification) } />
            }}
            refreshControl={<RefreshControl colors={['#00bcd4']}
                                            refreshing={pending}
                                            onRefresh={fetchList} />}
            keyExtractor={(notification) => notification._id} />
);

const NotificationsPage = ({ notifications = [], loaded, pending, fetchList }) => (
  <View style={{flex: 1}}>
    <HeaderSection />
    {!loaded || (loaded && notifications.length)
      ? <Notifications notifications={notifications} pending={pending} fetchList={fetchList} />
      : <EmptyResults />}
  </View>
);

export default compose(
  connect(
    (state) => ({
      notifications: state.notifications.list,
      loaded: state.notifications.loaded,
      pending: state.notifications.pending
    }),
    { fetchList: actions.notifications.fetchList }
  ),
  lifecycle({
    componentDidMount() {
      const { fetchList } = this.props;
      fetchList();
    }
  })
)(NotificationsPage);
