// import * as types from './../constants/actionTypes'
//
// let defaultState = {
//     info: {},
//     loaded: false
// };
//
// export let eventReducer = (state = defaultState, action) => {
//     const { payload } = action;
//     switch (action.type) {
//         case types.EVENTS_LIST:
//             return {
//                 ...state,
//                 info: {
//                     ...state.info,
//                     [payload.uid]: {
//                         ...payload.info
//                     }
//                 }
//             };
//         case types.ADD_USER_EVENTS_LIST_INFO:
//             return {
//                 ...state,
//                 info: payload.info,
//                 loaded: true
//             };
//         default:
//             return state;
//     }
// };
