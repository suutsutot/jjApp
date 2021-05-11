import config from 'src/config';
import request from './request';

export const duplicateAuth0Login = email => {
  return request(`${config.server}/api/users/duplicate-auth0`, {
    method: 'POST',
    body: JSON.stringify({
      email
    })
  });
};

export const duplicateAuth0SignUp = profile => {
  return request(`${config.server}/api/users/duplicate-auth0`, {
    method: 'POST',
    body: JSON.stringify(profile)
  });
};
