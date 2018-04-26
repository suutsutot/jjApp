// - Import external components
import * as redux from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducers from './../reducers'

import { middleware } from './../config/redux';

// - Build the middleware for intercepting and dispatching navigation actions
const logger = createLogger();

// - initial state
let initialState = {};

// - Config and create store of redux
// let store = redux.createStore(reducers, initialState, redux.compose(
//     redux.applyMiddleware(logger, thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

let store = redux.createStore(reducers, initialState, redux.compose(
        redux.applyMiddleware(logger, thunk, middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

export default store