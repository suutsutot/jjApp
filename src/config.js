import googleServices from '../android/app/google-services';

const config = {
  dev: {
    server: 'https://api.justjoin1.ru',
    client: 'https://justjoin1.ru',
    auth0: {
      clientId: 'BBLp6dT9ug1mxY5UI3xwld6cA3Ukn8aH',
      domain: 'ynpl.auth0.com'
    }
  },
  prod: {
    server: 'https://api.justjoin.com',
    client: 'https://justjoin.com',
    auth0: {
      clientId: 'XGuZrlmsgbqVC1NwH9EV69_Ab5Ztuqe3',
      domain: 'justjoin.eu.auth0.com'
    }
  }
};

export default {
  ...config.dev,
  senderID: googleServices.project_info.project_number
};
