import { NativeModules, Platform } from 'react-native'

const getPhoneLocale = () => {
  if (Platform.OS === 'ios') {
    return NativeModules.SettingsManager.settings.AppleLocale;
  } else if (Platform.OS === 'android') {
    return NativeModules.I18nManager.localeIdentifier;
  }

  return 'en_US';
};

export const getPhoneJJLocale = () => {
  const locale = getPhoneLocale();

  if (locale.indexOf('en') === 0) {
    return 'en';
  } else if (locale.indexOf('nb') === 0) {
    return 'nb';
  } else if (locale.indexOf('ru') === 0) {
    return 'ru';
  }

  return 'en';
};
