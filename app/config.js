const config = {
    'local': {
        server: 'http://10.8.0.18:3000', // set your IP address
        client: 'http://10.8.0.18:8080'
    },
    'dev': {
        server: 'http://justjoin1.ru',
        client: 'http://justjoin1.ru'
    },
    'prod': {
        server: 'http://justjoin.com',
        client: 'http://justjoin.com'
    }
};

export default config.local;
