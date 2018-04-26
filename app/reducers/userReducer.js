// - Import action types
import * as types from './../constants/actionTypes'

let defaultState = {
    info: {},
    loaded: false,
    profile: {}
};

/**
 * User reducer
 */
export let userReducer = (state = defaultState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.ADD_PROFILE:
            return {
                ...state,
                profile: payload.info,
                loaded: true
            };
        case types.ADD_USER_INFO:
            return {
                ...state,
                info: {
                    ...state.info,
                    [payload.uid]: {
                        ...payload.info
                    }
                },
                loaded: true
            };
        // case types.ADD_PEOPLE_INFO:
        //   return {
        //     ...state,
        //     info: {
        //       ...state.info,
        //       ...payload
        //     }
        //   }
        //
        // case types.UPDATE_USER_INFO:
        //   return {
        //     ...state,
        //     info: {
        //       ...state.info,
        //       [payload.uid]: {
        //         ...state.info[payload.uid],
        //         ...payload.info
        //       }
        //     }
        //   }
        //
        //
        // case types.CLEAR_ALL_DATA_USER:
        //   return defaultState
        //
        // case types.CLOSE_EDIT_PROFILE:
        //   return {
        //     ...state,
        //     openEditProfile: false
        //   }
        //
        // case types.OPEN_EDIT_PROFILE:
        //   return {
        //     ...state,
        //     openEditProfile: true
        //   }


        default:
            return state;
    }
};