import * as redux from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducers from './../reducers'

import {middleware} from './../config/redux';

const logger = createLogger();

let initialState = {};

let store = redux.createStore(reducers, initialState, redux.compose(
    redux.applyMiddleware(logger, thunk, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store
