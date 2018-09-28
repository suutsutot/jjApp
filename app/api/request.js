import { merge } from 'ramda';

import { refresh } from './refreshTokenAPI';

export default (url, options) => async () => {
  const newToken = await refresh();
  if (!newToken) Promise.resolve(null);

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
  return response.json();
};
