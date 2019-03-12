import request from './request';
import config from 'src/config';

// https://api.justjoin1.ru/api/activities

export const activitiesData = () => {
    console.log('config.server', config.server)
  return request(`${config.server}/api/activities`, {
    method: 'GET'
  });
};


console.log('dsadd')

