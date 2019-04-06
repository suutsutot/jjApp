import { mergeRight } from 'ramda';

import { delayPayload } from 'src/utils/asyncUtils';
import { refresh } from './refreshTokenAPI';

const log = (...args) => {
  console.log('\n');
  console.log(...args);
  console.log('========= \n');
};

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
        log('request', url, options);

        return Promise.race([
          delayPayload(5000, { error: 'timeout', timeout: true }),
          fetch(
            url,
            mergeRight(
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
        log('success', url, options);

        if (response.error && response.timeout) {
          return resolve(response);
        }

        return response.json().then(resolve);
      })
      .catch(error => {
        log('error', url, options, error);
        resolve({ error });
      });
  });
