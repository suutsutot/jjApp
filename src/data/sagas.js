import { all } from 'redux-saga/effects';

import notifications from './notifications/sagas';
import events from './event/sagas';
import users from './users/sagas';
import communities from './communities/sagas';

export default function* sagas() {
  yield all([
    notifications(),
    events(),
    users(),
    communities()
  ]);
}
