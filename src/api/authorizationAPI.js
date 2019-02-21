import config from 'src/config';
import request from './request';

export const postUserData = (idToken, profile) => {
  return request(`${config.server}/api/users/duplicate-auth0`, {
    method: 'POST',
    body: JSON.stringify({
      email: profile.email
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: idToken
    }
  });
};
