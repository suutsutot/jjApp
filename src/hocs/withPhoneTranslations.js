import { withState, withHandlers, lifecycle, compose } from 'recompose';

import { getPhoneJJLocale } from '../framework/i18n/getPhoneLocale';
import i18n from '../framework/i18n';

export default compose(
  withState('phoneLocale', 'setPhoneLocale'),
  lifecycle({
    componentDidMount() {
      const phoneLocale = getPhoneJJLocale();
      this.props.setPhoneLocale(phoneLocale);
    }
  }),
  withHandlers({
    i18n: ({ phoneLocale }) => (key, namespace) => i18n(key, namespace, phoneLocale)
  })
);
