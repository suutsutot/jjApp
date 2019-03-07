import { call } from 'redux-saga/effects';

import * as Snackbar from 'src/framework/snackbar';
import i18n from 'src/framework/i18n';

export const showNotificationsSnackbar = () => {
  return call(Snackbar.show, {
    title: i18n('notification_action_error'),
    duration: Snackbar.LENGTH_LONG
  });
};
