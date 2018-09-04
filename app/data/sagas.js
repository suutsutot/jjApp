import { all } from 'redux-saga/effects';

import notifications from './notifications/sagas';

export default function* sagas() {
  yield all([
    notifications()
  ]);
}
