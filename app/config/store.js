import * as redux from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducers from 'app/data'

import {middleware} from 'app/config/redux';

const logger = createLogger();

let initialState = {};

let store = redux.createStore(reducers, initialState, redux.compose(
    redux.applyMiddleware(logger, thunk, middleware)
));

export default store
