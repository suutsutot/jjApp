import { AsyncStorage } from 'react-native';

import auth0 from 'app/framework/auth0';

export const refresh = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  return refreshByCredentials({ refreshToken });
};

export const refreshByCredentials = ({ refreshToken }) => {
  if (!refreshToken) return Promise.resolve(null);
  return auth0.auth.refreshToken({ refreshToken });
};
