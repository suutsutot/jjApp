import * as types from './../constants/actionTypes'

let defaultState = {
    info: {},
    loaded: false,
    profile: {}
};

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
        default:
            return state;
    }
};
