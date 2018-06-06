import * as redux from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducers from 'app/data';
import {middleware} from 'app/config/redux';

const logger = createLogger({});

// const logger = store => next => action => {
//     console.log('dispatching', action);
//     let result = next(action);
//     console.log('next state', store.getState());
//
//     // start
//
//     // let data = [{
//     //     'dispatching': action,
//     //     'next state': store.getState()
//     // }];
//
//     // end
//
//     return result
// };

let initialState = {};

let store = redux.createStore(reducers, initialState, redux.compose(
    redux.applyMiddleware(thunk, middleware, logger)
));

export default store
