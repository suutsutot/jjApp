const config = {
    'local': {
        server: 'http://10.0.3.2:3000', // set your device IP address
        client: 'http://10.0.3.2:8080'  // set your device IP address
    },
    'dev': {
        server: 'http://justjoin1.ru',
        client: 'http://justjoin1.ru'
    },
    'prod': {
        server: 'https://justjoin.com',
        client: 'https://justjoin.com'
    }
};

export default config.dev;
