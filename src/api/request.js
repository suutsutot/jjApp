import { merge } from 'ramda';

import { delayPayload } from 'src/utils/asyncUtils';
import { refresh } from './refreshTokenAPI';

export default (url, options) =>
  new Promise(resolve => {
    refresh()
      .then(newToken => {
        if (!newToken) {
          resolve({ error: 'newToken is null or undefined' });
        }

        return newToken;
      })
      .then(newToken => {
        return Promise.race([
          delayPayload(5000, { error: 'timeout', timeout: true }),
          fetch(
            url,
            merge(
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: newToken.idToken
                }
              },
              options
            )
          )
        ]);
      })
      .then(response => {
        if (response.error && response.timeout) {
          return resolve(response);
        }

        return response.json().then(resolve);
      })
      .catch(error => {
        resolve({ error });
      });
  });
