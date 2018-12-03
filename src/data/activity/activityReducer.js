import * as types from 'src/constants/actionTypes';

let defaultState = {
    activitiesList: {},
    loaded: false
};

export let activityReducer = (state = defaultState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.GET_ACTIVITIES_LIST_INFO:
            return {
                ...state,
                activitiesList: [
                    payload.info,
                ],
                loaded: true
            };
        default:
            return state;
    }
};
