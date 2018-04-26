// - Import action types
import * as types from './../constants/actionTypes'

let defaultState = {
    activitiesList: {},
    loaded: false
};

/**
 * Activity reducer
 */
export let activityReducer = (state = defaultState, action) => {
    const { payload } = action;
    switch (action.type) {
        case types.GET_ACTIVITIES_LIST_INFO:
            console.log('payload123', payload.info)
            return {
                ...state,
                activitiesList: [
                    payload.info,
                ],
                loaded:true
            };
        default:
            return state;
    }
};