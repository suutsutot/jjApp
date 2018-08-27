import { all } from 'redux-saga/effects';

import notification from './notification/sagas';

export default function* sagas() {
  yield all([
    notification()
  ]);
}
