import config from 'src/config';
import request from './request';

export const postUserData = (email) => {
  return request(`${config.server}/api/users/duplicate-auth01`, {
    method: 'POST',
    body: JSON.stringify({
      email
    })
  });
};
