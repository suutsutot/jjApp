import { all } from 'redux-saga/effects';

import notifications from './notifications/sagas';
import events from './event/sagas';

export default function* sagas() {
  yield all([
    notifications(),
    events()
  ]);
}
