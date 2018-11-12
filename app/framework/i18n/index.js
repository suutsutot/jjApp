import { path, toLower } from 'ramda';
import store from 'app/store';

const translations = {
  en: {
    general: require('./en.json'),
    activities: require('./activities/activities-en.json')
  },
  nb: {
    general: require('./no.json'),
    activities: require('./activities/activities-no.json')
  },
  ru: {
    general: require('./ru.json'),
    activities: require('./activities/activities-ru.json')
  }
};
const defaultLanguage = 'en';

export default function i18n(key, namespace = 'general') {
  const language = path(['authorize', 'profile', 'language'], store.getState());

  if (!key) return '';
  return (
    path([language || defaultLanguage, namespace, key], translations) ||
    toLower(key)
  );
}
