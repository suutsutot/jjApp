// import request from './request';
// import config from 'src/config';

// export const activitiesData = () => {
//   return request(`${config.server}/api/activities`, {
//     method: 'GET'
//   });
// };

export const postRegistrationData = data => {
  return fetch('https://ynpl.auth0.com/dbconnections/signup', {
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
