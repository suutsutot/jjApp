import React from 'react';
import { connect } from 'react-redux';
import { compose, toUpper, toLower } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';
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

import i18n from 'src/framework/i18n';
import { Button, HeaderSection } from 'src/pureComponents';
import config from 'src/config';
import { refresh } from 'src/api/refreshTokenAPI';
import actions from 'src/data/actions';
import {
  getNotification,
  getNotViewedNotificationsIds,
  getViewedNotificationsIds,
  getLoadingStatus
} from 'src/data/notifications/selectors';
import imgix from 'src/framework/imgix';
import LoadingButton from 'src/pureComponents/Button/LoadingButton';
import types from 'src/constants/actionTypes';

import styles from './styles';

const Touchable = ({ children, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
);

const NotificationInfo = ({ children }) => (
  <Text
    ellipsizeMode="middle"
    numberOfLines={3}
    style={{ flexWrap: 'wrap', marginBottom: 5 }}
  >
    {children}
  </Text>
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
      <NotificationIcon source={imageSource} />
      <View style={[styles.layoutColumn, styles.leftPaddingText]}>
        <View style={[styles.layoutRow, { flex: 1 }]}>{firstRow}</View>
        <View style={[styles.layoutRow]}>{secondRow}</View>
      </View>
    </View>
    {Boolean(hasActions) && <View>{actions}</View>}
  </View>
);

const NotificationsListItem = ({
  type,
  notification,
  loadingStatus = {},
  onPress,
  joinEventRequest,
  rejectEventRequest,
  followUserRequest,
  joinCommunityRequest,
  leaveCommunityRequest
}) => {
  switch (type) {
    case 'eventInvitation': {
      const isPassedEvent =
        moment(notification.event.eventDates.startDateTime) < moment();
      console.log(
        'notification.event.eventDates.startDateTime',
        notification.event.eventDates.startDateTime
      );

      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri: imgix(
              notification.event.miniaturePic ||
                notification.event.backgroundPic,
              'list'
            )
          }}
          firstRow={
            <NotificationInfo>
              <PrimaryText>
                {notification.event.title ||
                  i18n(notification.event.activity.id, 'activities')}
              </PrimaryText>
              <SecondaryText>
                {i18n('on')}
                {moment(notification.event.eventDates.startDateTime).format(
                  'Do MMMM'
                )}{' '}
                {i18n('at')}{' '}
                {moment(notification.event.eventDates.startDateTime).format(
                  'LT'
                )}
                {isPassedEvent && `, ${toLower(i18n('event_is_passed'))}`}
              </SecondaryText>
            </NotificationInfo>
          }
          secondRow={
            <NotificationInfo>
              <PrimaryText>{notification.creatorName}</PrimaryText>
              <SecondaryText> {i18n('invites_you_to_event')}</SecondaryText>
            </NotificationInfo>
          }
          hasActions={!notification.answered && !isPassedEvent}
          actions={
            <Actions>
              <Button
                type="text"
                buttonStyle={styles.actionButton}
                onPress={() =>
                  isNilOrEmpty(loadingStatus) &&
                  rejectEventRequest(notification.event._id, notification._id)
                }
              >
                {i18n('reject')}
              </Button>
              <LoadingButton
                type="primary"
                onPress={() =>
                  isNilOrEmpty(loadingStatus) &&
                  joinEventRequest(notification.event._id, notification._id)
                }
                loading={loadingStatus.type === types.EVENTS.JOIN_EVENT_REQUEST}
                title={toUpper(i18n('join'))}
              />
            </Actions>
          }
        />
      );
    }
    case 'communityInvitation':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri: imgix(
              notification.community.miniaturePic ||
                notification.community.backgroundPic,
              'list'
            )
          }}
          firstRow={
            <NotificationInfo>
              <PrimaryText>{notification.community.title}</PrimaryText>
            </NotificationInfo>
          }
          secondRow={
            <NotificationInfo>
              <PrimaryText>{notification.creatorName}</PrimaryText>
              <SecondaryText> {i18n('invites_you_to_community')}</SecondaryText>
            </NotificationInfo>
          }
          hasActions={!notification.answered}
          actions={
            <Actions>
              <Button
                type="text"
                buttonStyle={styles.actionButton}
                onPress={() => {
                  isNilOrEmpty(loadingStatus) &&
                    leaveCommunityRequest(
                      notification.community._id,
                      notification._id
                    );
                }}
              >
                {i18n('reject')}
              </Button>
              <LoadingButton
                type="primary"
                onPress={() =>
                  isNilOrEmpty(loadingStatus) &&
                  joinCommunityRequest(
                    notification.community._id,
                    notification._id
                  )
                }
                loading={
                  loadingStatus.type ===
                  types.COMMUNITIES.JOIN_COMMUNITY_REQUEST
                }
                title={toUpper(i18n('join'))}
              />
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
            <NotificationInfo>
              <PrimaryText>
                {notification.user.firstName} {notification.user.lastName}
              </PrimaryText>
              <SecondaryText> {i18n('following_you')}</SecondaryText>
            </NotificationInfo>
          }
          hasActions={!notification.answered}
          actions={
            <Actions>
              <LoadingButton
                type="primary"
                onPress={() =>
                  isNilOrEmpty(loadingStatus) &&
                  followUserRequest(notification.user._id, notification._id)
                }
                loading={loadingStatus.type === types.USERS.FOLLOW_USER_REQUEST}
                title={toUpper(i18n('follow'))}
              />
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
            <NotificationInfo>
              <PrimaryText>
                {notification.user.firstName} {notification.user.lastName}
              </PrimaryText>
              <SecondaryText> {i18n('accepting_request')}</SecondaryText>
            </NotificationInfo>
          }
        />
      );
    case 'communityComment':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri: imgix(
              notification.community.miniaturePic ||
                notification.community.backgroundPic,
              'list'
            )
          }}
          firstRow={
            <NotificationInfo>
              <PrimaryText>{notification.community.title}</PrimaryText>
              <SecondaryText> {i18n('wrote_comment')}</SecondaryText>
            </NotificationInfo>
          }
          secondRow={
            <NotificationInfo>
              <Text>{notification.details.text}</Text>
            </NotificationInfo>
          }
        />
      );
    case 'eventComment':
      return (
        <Notification
          notification={notification}
          onPress={() => onPress(notification)}
          imageSource={{
            uri: imgix(
              notification.event.miniaturePic ||
                notification.event.backgroundPic,
              'list'
            )
          }}
          firstRow={
            <NotificationInfo>
              <PrimaryText>
                {notification.event.title || notification.event.activity.name}
              </PrimaryText>
              <SecondaryText> {i18n('wrote_comment')}</SecondaryText>
            </NotificationInfo>
          }
          secondRow={
            <NotificationInfo>
              <Text>{notification.details.text}</Text>
            </NotificationInfo>
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
            <NotificationInfo>
              <PrimaryText>
                {notification.user.firstName} {notification.user.lastName}
              </PrimaryText>
              <SecondaryText> {i18n('wrote_comment')}</SecondaryText>
            </NotificationInfo>
          }
          secondRow={
            <NotificationInfo>
              <Text>{notification.details.text}</Text>
            </NotificationInfo>
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
            uri: imgix(
              notification.community.miniaturePic ||
                notification.community.backgroundPic,
              'list'
            )
          }}
          firstRow={
            <NotificationInfo>
              <PrimaryText>{notification.details.eventName}</PrimaryText>
              <SecondaryText>
                {' '}
                {i18n('on')}{' '}
                {moment(notification.details.date).format('Do MMM')}
              </SecondaryText>
            </NotificationInfo>
          }
          secondRow={
            <NotificationInfo>
              <PrimaryText>{notification.community.title}</PrimaryText>
              <SecondaryText> {i18n('invites_you_to_event')}</SecondaryText>
            </NotificationInfo>
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

const NotificationsListItemContainer = connect(
  (state, { id }) => {
    const notification = getNotification(id)(state);
    return {
      type: notification.type,
      notification,
      loadingStatus: getLoadingStatus(id)(state)
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
    keyExtractor={notificationId => notificationId}
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
