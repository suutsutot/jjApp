import { mergeRight } from 'ramda';

import { delayPayload } from 'src/utils/asyncUtils';
import { refresh } from './refreshTokenAPI';
import { serverLog } from '../framework/logging';
import { REQUEST_ERROR } from '../constants/errors';

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
          const payload = {
            error: response.error,
            timeout: true,
            url,
            options
          };

          return resolve(payload);
        }

        return response.json().then(resolve);
      })
      .catch(error => {
        const payload = { error, timeout: false, url, options };

        log('error', payload);
        serverLog(REQUEST_ERROR, payload);
        resolve(payload);
      });
  });
