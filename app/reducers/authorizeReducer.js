// - Import action types
import * as types from './../constants/actionTypes'

let defaultState = {
    email: '',
    userId: '',
    authed: false
};

export let authorizeReducer = (state = defaultState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                email: action.email,
                authed: true
            };
        case types.GET_USER_ID:
            return {
                ...state,
                userId: payload.userId,
                email: payload.email,
                authed: true
            };
        case types.LOGOUT:
            return {
                ...state,
                email: '',
                authed: false
            };
        default:
            return state
    }
};
