import { compose, filter, length, path, values, pick, map } from 'ramda';

const getListNotifications = compose(
  values,
  filter(Boolean),
  ({ list, data }) => pick(list, data),
  path(['notifications'])
);

export const getListNotificationsIds = compose(
  map(x => x._id),
  getListNotifications
);


export const getNotification = id =>
  compose(
    ({ data }) => path([id], data),
    path(['notifications'])
  );

export const getNotificationsCounter = compose(
  length,
  filter(n => !n.viewed),
  getListNotifications
);
