import * as types from './../constants/actionTypes'


export const showNotificationSuccess = () => {
    return {
        type: types.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL
    }
};

export const hideMessage = () => {
    return {
        type: types.HIDE_MESSAGE_GLOBAL
    }
};

export const showErrorMessageWithTimeout = (error) => {
    return (dispatch, getState) => {
        dispatch(showErrorMessage(error));
        setTimeout(() => {
            dispatch(hideMessage())
        }, 2000)
    }
};

export const showErrorMessage = (error) => {
    return {
        type: types.SHOW_ERROR_MESSAGE_GLOBAL,
        payload: error
    }
};

export const showLoading = () => {
    return {
        type: types.SHOW_LOADING
    }
};

export const hideLoading = () => {
    return {
        type: types.HIDE_LOADING
    }
};

export const changeWindowSize = (height, width) => {
    return {
        type: types.CHANGE_WINDOW_SIZE,
        payload: {height, width}
    }
};
