import * as types from 'app/constants/actionTypes'

let defaultState = {
    email: '',
    userId: '',
    authed: false,
    profile: {}
};

export let authorizeReducer = (state = defaultState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                email: action.email,
                authed: true,
                profile: action.user
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
