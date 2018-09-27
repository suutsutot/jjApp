import { compose, filter, length } from 'ramda';

export const getNotificationsCounter = state =>
  compose(
    length,
    filter(n => !n.viewed)
  )(state.notifications.list);
