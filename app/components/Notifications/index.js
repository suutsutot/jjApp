import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, toUpper } from 'ramda';
import { lifecycle } from 'recompose';
import {
  View,
  Text,
  Linking,
  SectionList,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import i18n from 'app/framework/i18n';
import { Button, HeaderSection } from 'app/pureComponents';
import config from 'app/config';
import { refresh } from 'app/api/refreshTokenAPI';
import actions from 'app/data/actions';
import {
  getNotification,
  getNotViewedNotificationsIds,
  getViewedNotificationsIds
} from 'app/data/notifications/selectors';

import styles from './styles';

const Touchable = ({ children, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
);

const PrimaryText = ({ children }) => (
  <Text style={styles.blackColorText}>{children}</Text>
);

const SecondaryText = ({ children }) => (
  <Text style={styles.grayColorText}>{children}</Text>
);

const NotificationIcon = ({ source }) => (
  <Image style={styles.notificationIcon} source={source} />
);

const Actions = ({ children }) => (
  <View style={styles.actionsView}>{children}</View>
);

const Notification = ({
  notification,
  onPress,
  imageSource,
  firstRow,
  secondRow,
  hasActions,
  actions
}) => (
  <View>
    <View style={StyleSheet.flatten([styles.container, styles.layoutRow])}>
      <NotificationIcon
        source={{ uri: `https://placeimg.com/120/120/any${notification._id}` }}
      />
      <View style={[styles.layoutColumn, styles.leftPaddingText]}>
        <View style={[styles.layoutRow, { flex: 1 }]}>{firstRow}</View>
        <View style={[styles.layoutRow]}>{secondRow}</View>
      </View>
    </View>
    {Boolean(hasActions) && <View>{actions}</View>}
  </View>
);

const getNotificationComponent = type => ({
  notification,
  onPress,
  joinEventRequest,
  rejectEventRequest,
  followUserRequest,
  joinCommunityRequest,
  leaveCommunityRequest
}) => {
  switch (type) {
    case 'eventInvitation':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri:
              notification.event.miniaturePic ||
              notification.event.backgroundPic
          }}
          firstRow={
            <Fragment>
              <PrimaryText>
                {notification.event.title ||
                  i18n(notification.event.activity.id, 'activities')}
              </PrimaryText>
              <SecondaryText>
                {i18n('on')}
                {moment(notification.event.eventDates.startDate).format(
                  'Do MMMM'
                )}
              </SecondaryText>
            </Fragment>
          }
          secondRow={
            <Fragment>
              <PrimaryText>{notification.creatorName}</PrimaryText>
              <SecondaryText>{' '}{i18n('invites_you_to_event')}</SecondaryText>
            </Fragment>
          }
          hasActions={!notification.answered}
          actions={
            <Actions>
              <Button
                type="text"
                buttonStyle={styles.actionButton}
                onPress={() => rejectEventRequest(notification.event._id)}
              >
                {i18n('reject')}
              </Button>
              <Button
                type="primary"
                buttonStyle={styles.actionButton}
                onPress={() => joinEventRequest(notification.event._id)}
              >
                {toUpper(i18n('join'))}
              </Button>
            </Actions>
          }
        />
      );
    case 'communityInvitation':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri:
              notification.community.miniaturePic ||
              notification.community.backgroundPic
          }}
          firstRow={
            <Fragment>
              <PrimaryText>{notification.community.title}</PrimaryText>
            </Fragment>
          }
          secondRow={
            <Fragment>
              <PrimaryText>{notification.creatorName}</PrimaryText>
              <SecondaryText>{' '}{i18n('invites_you_to_community')}</SecondaryText>
            </Fragment>
          }
          hasActions={!notification.answered}
          actions={
            <Actions>
              <Button
                type="text"
                buttonStyle={styles.actionButton}
                onPress={() =>
                  leaveCommunityRequest(notification.community._id)
                }
              >
                {i18n('reject')}
              </Button>
              <Button
                type="primary"
                buttonStyle={styles.actionButton}
                onPress={() => joinCommunityRequest(notification.community._id)}
              >
                {toUpper(i18n('join'))}
              </Button>
            </Actions>
          }
        />
      );
    case 'friendRequest':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{ uri: notification.user.pic }}
          firstRow={
            <Fragment>
              <PrimaryText>
                {notification.user.firstName} {notification.user.lastName}
              </PrimaryText>
              <SecondaryText>{' '}{i18n('following_you')}</SecondaryText>
            </Fragment>
          }
          hasActions={!notification.answered}
          actions={
            <Actions>
              <Button
                type="primary"
                buttonStyle={styles.actionButton}
                onPress={() => followUserRequest(notification.user._id, notification._id)}
              >
                {toUpper(i18n('follow'))}
              </Button>
            </Actions>
          }
        />
      );
    case 'friendAccept':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{ uri: notification.user.pic }}
          firstRow={
            <Fragment>
              <PrimaryText>
                {notification.user.firstName} {notification.user.lastName}
              </PrimaryText>
              <SecondaryText>{' '}{i18n('accepting_request')}</SecondaryText>
            </Fragment>
          }
        />
      );
    case 'communityComment':
      return (
          <Notification
            notification={notification}
            onPress={() => onPress(notification)}
            imageSource={{
              uri:
                notification.community.miniaturePic ||
                notification.community.backgroundPic
            }}
            firstRow={
              <Fragment>
                <PrimaryText>{notification.community.title}</PrimaryText>
                <SecondaryText>{' '}{i18n('wrote_comment')}</SecondaryText>
              </Fragment>
            }
            secondRow={
              <Fragment>
                <Text>{notification.details.text}</Text>
              </Fragment>
            }
          />
      );
    case 'eventComment':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri:
              notification.event.miniaturePic ||
              notification.event.backgroundPic
          }}
          firstRow={
            <Fragment>
              <PrimaryText>
                {notification.event.title || notification.event.activity.name}
              </PrimaryText>
              <SecondaryText>{' '}{i18n('wrote_comment')}</SecondaryText>
            </Fragment>
          }
          secondRow={
            <Fragment>
              <Text>{notification.details.text}</Text>
            </Fragment>
          }
        />
      );
    case 'userComment':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{ uri: notification.user.pic }}
          firstRow={
            <Fragment>
              <PrimaryText>
                {notification.user.firstName} {notification.user.lastName}
              </PrimaryText>
              <SecondaryText>{' '}{i18n('wrote_comment')}</SecondaryText>
            </Fragment>
          }
          secondRow={
            <Fragment>
              <Text>{notification.details.text}</Text>
            </Fragment>
          }
        />
      );
    case 'oneTimeEventCreate':
    case 'repeatedEventCreate':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri:
              notification.community.miniaturePic ||
              notification.community.backgroundPic
          }}
          firstRow={
            <Fragment>
              <PrimaryText>{notification.details.eventName}</PrimaryText>
              <SecondaryText>
                {' '}
                {i18n('on')} {moment(notification.details.date).format('Do MMM')}
              </SecondaryText>
            </Fragment>
          }
          secondRow={
            <Fragment>
              <PrimaryText>{notification.community.title}</PrimaryText>
              <SecondaryText>{' '}{i18n('invites_you_to_event')}</SecondaryText>
            </Fragment>
          }
        />
      );
  }
};

const EmptyResults = () => (
  <View style={[styles.containerProcess]}>
    <MaterialIcons name={'notifications-none'} size={48} />
    <Text>{i18n('empty_notifications')}.</Text>
  </View>
);

const getRedirectType = notification => {
  if (
    notification.type === 'eventInvitation' ||
    notification.type === 'oneTimeEventCreate' ||
    notification.type === 'repeatedEventCreate'
  ) {
    return 'event';
  } else if (notification.type === 'communityInvitation') {
    return 'community';
  } else if (
    notification.type === 'friendRequest' ||
    notification.type === 'friendAccept'
  ) {
    return 'user';
  }

  return '';
};

const redirectToWeb = async notification => {
  const newToken = await refresh();

  const redirectType = getRedirectType(notification);
  const { accessToken, idToken } = newToken;
  const { creatorId } = notification;

  const url = `${
    config.server
  }/redirect?type=${redirectType}&idToken=${idToken}&accessToken=${accessToken}`;
  const supported = await Linking.canOpenURL(url);
  supported && Linking.openURL(url);
};

const NotificationsListItem = props => {
  const Component = getNotificationComponent(props.notification.type);
  return <Component {...props} />;
};

const NotificationsListItemContainer = connect(
  (state, { id }) => {
    return {
      notification: getNotification(id)(state)
    };
  },
  {
    joinEventRequest: actions.events.joinEventRequest,
    rejectEventRequest: actions.events.rejectEventRequest,
    followUserRequest: actions.users.followUserRequest,
    joinCommunityRequest: actions.communities.joinCommunityRequest,
    leaveCommunityRequest: actions.communities.leaveCommunityRequest
  }
)(NotificationsListItem);

const Notifications = ({
  viewedNotificationsIds,
  notViewedNotificationsIds,
  pending,
  fetchList
}) => (
  <SectionList
    renderItem={({ item: id }) => <NotificationsListItemContainer id={id} />}
    renderSectionHeader={({ section: { title } }) => null}
    sections={[
      { title: 'Not viewed', data: notViewedNotificationsIds },
      { title: 'Viewed', data: viewedNotificationsIds }
    ]}
    refreshControl={
      <RefreshControl
        colors={['#00bcd4']}
        refreshing={pending}
        onRefresh={fetchList}
      />
    }
    keyExtractor={notification => notification}
  />
);

const NotificationsPage = ({
  viewedNotificationsIds = [],
  notViewedNotificationsIds = [],
  loaded,
  pending,
  fetchList
}) => (
  <View style={{ flex: 1 }}>
    <HeaderSection title={i18n('notifications')} />
    {!loaded ||
    (loaded &&
      (viewedNotificationsIds.length || notViewedNotificationsIds.length)) ? (
      <Notifications
        viewedNotificationsIds={viewedNotificationsIds}
        notViewedNotificationsIds={notViewedNotificationsIds}
        pending={pending}
        fetchList={fetchList}
      />
    ) : (
      <EmptyResults />
    )}
  </View>
);

export default compose(
  connect(
    state => ({
      viewedNotificationsIds: getViewedNotificationsIds(state),
      notViewedNotificationsIds: getNotViewedNotificationsIds(state),
      loaded: state.notifications.loaded,
      pending: state.notifications.pending
    }),
    {
      fetchList: actions.notifications.fetchList
    }
  ),
  lifecycle({
    componentDidMount() {
      const { fetchList } = this.props;
      fetchList();
    }
  })
)(NotificationsPage);
