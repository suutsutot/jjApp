import {NavigationActions} from 'react-navigation';

export const dbSignUp = (email, password) => {
  return dispatch => {
    dispatch(applicationActions.showLoading());

    const url = 'https://ynpl.auth0.com/dbconnections/signup';
    const data = {
      client_id: 'BBLp6dT9ug1mxY5UI3xwld6cA3Ukn8aH',
      email: email,
      password: password,
      connection: 'Username-Password-Authentication'
    };

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(responseData => {
      if (responseData) {
        console.log('responseData', responseData);
        const resetAction = NavigationActions.navigate({
          routeName: 'Login'
        });
        dispatch(resetAction);
        alert('Successfully! Please log in');
        dispatch(applicationActions.hideLoading());
      } else {
        alert('Sorry, there was a sign up error');
        dispatch(applicationActions.hideLoading());
      }
    })
    .catch(error => {
      console.log('AuthorizeActionError:', error);
      dispatch(applicationActions.hideLoading());
    });
  };
};

