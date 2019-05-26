import request from './request';
import config from 'src/config';

export const registerUserAuth0 = data => {
  return fetch(`${config.auth0.domain}/dbconnections/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => {
      return { error };
    });
};

export const getActivities = () => {
  return request(`${config.server}/api/activities`, {
    method: 'GET'
  });
};

export const putPersonalData = data => {
  return request(`${config.server}/api/users`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const postUserActivities = data => {
  return request(`${config.server}/api/users`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};
