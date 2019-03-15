import request from './request';
import config from 'src/config';

export const activitiesData = () => {
  return request(`${config.server}/api/activities`, {
    method: 'GET'
  });
};
