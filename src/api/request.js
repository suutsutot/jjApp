import { merge } from 'ramda';

import { refresh } from './refreshTokenAPI';

export default async (url, options) => {
  const newToken = await refresh();
  if (!newToken)
    return Promise.resolve({ error: 'newToken is null or undefined' });

  try {
    const response = await fetch(
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
    );
    return await response.json();
  } catch (error) {
    return Promise.resolve({ error });
  }
};
