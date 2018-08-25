const config = {
  'local': {
    server: 'http://10.0.3.2:3000',
    client: 'http://10.0.3.2:8080',
  },
  'dev': {
    server: 'https://api.justjoin1.ru',
    client: 'https://justjoin1.ru'
  },
  'prod': {
    server: 'https://api.justjoin.com',
    client: 'https://justjoin.com'
  }
};

export default {
  ...config.dev,
  senderID: '490595239693'
};
