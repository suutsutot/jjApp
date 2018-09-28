import * as types from 'app/constants/actionTypes';

let defaultState = {
    userEvents: {
        list: {},
        loaded: false
    },
    recommended: {
        list: {},
        loaded: false
    },
    newEvents: {
        list: {},
        loaded: false
    },
    joinEvent: {
        event: {},
        done: false
    },
    leaveEvent: {
        event: {},
        done: false
    }
};

export let eventReducer = (state = defaultState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.ADD_USER_EVENTS_LIST_INFO:
            return {
                ...state,
                userEvents: {list: payload.info, loaded: true},
            };
        case types.ADD_NEW_EVENTS:
            return {
                ...state,
                newEvents: {list: payload.info, loaded: true},
            };
        case types.ADD_RECOMMENDED_EVENTS:
            return {
                ...state,
                recommended: {list: payload.info, loaded: true},
            };
        case types.JOIN_EVENT:
            return {
                ...state,
                joinStatus: {event: payload.info, done: true},
            };
        case types.REJECT_EVENT:
            return {
                ...state,
                rejectStatus: {event: payload.info, done: true},
            };
        default:
            return state;
    }
};
