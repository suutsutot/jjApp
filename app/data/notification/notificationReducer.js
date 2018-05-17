import merge from 'lodash/merge'

import * as types from 'app/constants/actionTypes'

let defaultState = {
    userNotifies: [],
    // newNotifications: 0,
    loaded: false
};

export let notifyReducer = (state = defaultState, action) => {
    let {payload} = action;
    switch (action.type) {
        case types.ADD_NOTIFY:
            return state;

        case types.ADD_NOTIFY_LIST:
            return {
                ...state,
                userNotifies: [...payload],
                // newNotifications: [...payload.length],
                loaded: true
            };

        case types.UPDATE_NOTIFICATIONS:
            return {
                ...state,
                userNotifies: [...payload],
                // newNotifications: [...payload.length],
                loaded: true
            };

        // case types.SEEN_NOTIFY:
        //     return {
        //         ...state,
        //         userNotifies: {
        //             ...state.userNotifies,
        //             [payload]: {
        //                 ...state.userNotifies[payload],
        //                 isSeen: true
        //             }
        //         },
        //         loaded: true
        //     };
        //
        // case types.DELETE_NOTIFY:
        //     var parsedNotifies = {};
        //     Object.keys(state.userNotifies).map((id) => {
        //         if (id !== payload) {
        //             merge(parsedNotifies, {[id]: {...state.userNotifies[id]}})
        //         }
        //
        //     });
        //     return {
        //         ...state,
        //         userNotifies: {
        //             ...parsedNotifies
        //         }
        //     };
        //
        //
        // case types.CLEAR_ALL_DATA_NOTIFY:
        //     return defaultState;


        default:
            return state;

    }
};
