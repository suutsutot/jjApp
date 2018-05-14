import * as redux from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducers from './../reducers'

import {middleware} from './../config/redux';

const logger = createLogger();

let initialState = {};

let store = redux.createStore(reducers, initialState, redux.compose(
    redux.applyMiddleware(logger, thunk, middleware),
    // window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store


// import {createStore, applyMiddleware, compose} from "redux";
// import thunk from "redux-thunk";
// import makeRootReducer from './../reducers';
// import {createLogger} from "redux-logger";
//
// import createSocketIoMiddleware from "redux-socket.io";
//
// import io from "socket.io-client/dist/socket.io";
//
// let socket = io("http://192.168.56.1:3000", {jsonp: false, transports: ['websocket']});
//
// let socketIoMiddleware = createSocketIoMiddleware(socket, "/");
//
// const log = createLogger({diff: true, collapsed: true});
// const middleware = [thunk, log, socketIoMiddleware];
// let initialState = {};
// const enhancers = [];
//
// let store = createStore(makeRootReducer, initialState, compose(
//     applyMiddleware(...middleware), ...enhancers));
//
// export default store
