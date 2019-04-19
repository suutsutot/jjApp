import Auth0 from 'react-native-auth0';

import config from 'src/config';

export default new Auth0({
  clientId: config.auth0.clientId,
  domain: config.auth0.domain
});
