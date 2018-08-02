const config = {
    'local': {
        server: 'http://10.0.3.2:3000', // set your device IP address
        client: 'http://10.0.3.2:8080'  // set your device IP address
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

export default config.dev;
