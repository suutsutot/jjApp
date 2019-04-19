import { Crashlytics } from 'react-native-fabric';
import { Platform } from 'react-native';

export const serverLog = (message, data) => {
  console.log('\n');
  console.log('serverLog', message, data);
  console.log('========= \n');

  return Platform.select({
    ios: message => Crashlytics.recordError(message),
    android: message => Crashlytics.logException(message)
  })(JSON.stringify({ message, data }));
};
