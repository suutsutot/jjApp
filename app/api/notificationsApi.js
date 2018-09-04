import { refresh } from 'app/api/refreshTokenAPI';
import config from 'app/config';

export const getNotifications = async () => {
  const newToken = await refresh();
  if (!newToken) Promise.resolve(null);
  
  const response = await fetch(`${config.server}/api/notifications`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': newToken.idToken
    }
  });
  return response.json();
};
