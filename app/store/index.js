import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers from 'app/data/reducers';
import sagas from 'app/data/sagas';
import {navigationMiddleware} from 'app/config/navigationHelpers';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk, navigationMiddleware, sagaMiddleware)
));

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
export default store;
