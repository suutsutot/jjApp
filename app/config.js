const config = {
    'local': {
        // server: 'http://10.8.0.18:3000', // set your device IP address
        // client: 'http://10.8.0.18:8080'  // set your device IP address
        server: 'http://10.0.3.2:3000', // set your device IP address
        client: 'http://10.0.3.2:8080'  // set your device IP address
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
