// - Import react components
import _ from 'lodash'

// - Import action types
import * as types from './../constants/actionTypes'

let defaultState = {
    userNotifies: {},
    loaded: false
};

// Notify actions
export let notifyReducer = (state = defaultState, action) => {
    let {payload} = action;
    switch (action.type) {
        case types.ADD_NOTIFY:
            return state;

        case types.ADD_NOTIFY_LIST:
            return {
                ...state,
                userNotifies: [...payload],
                loaded: true
            };

        case types.SEEN_NOTIFY:
            return {
                ...state,
                userNotifies: {
                    ...state.userNotifies,
                    [payload]: {
                        ...state.userNotifies[payload],
                        isSeen: true
                    }
                },
                loaded: true
            };

        case types.DELETE_NOTIFY:
            var parsedNotifies = {};
            Object.keys(state.userNotifies).map((id) => {
                if (id !== payload) {
                    _.merge(parsedNotifies, {[id]: {...state.userNotifies[id]}})
                }

            });
            return {
                ...state,
                userNotifies: {
                    ...parsedNotifies
                }
            };


        case types.CLEAR_ALL_DATA_NOTIFY:
            return defaultState;


        default:
            return state;

    }
};
