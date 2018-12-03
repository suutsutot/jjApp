import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers from 'src/data/reducers';
import sagas from 'src/data/sagas';
import {navigationMiddleware} from 'src/config/navigationHelpers';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk, navigationMiddleware, sagaMiddleware)
));

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
export default store;
