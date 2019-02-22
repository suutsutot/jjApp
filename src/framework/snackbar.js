import Snackbar from 'react-native-snackbar';

let isShown = false;
const { LENGTH_SHORT, LENGTH_LONG } = Snackbar;

const getMs = duration => {
  switch (duration) {
    case LENGTH_SHORT: {
      return 1000;
    }
    case LENGTH_LONG: {
      return 3500;
    }
    default:
      return 1000;
  }
};

export const show = ({ title, duration = LENGTH_SHORT, action }) => {
  return new Promise(resolve => {
    let options = {
      title,
      duration,
      action: action && {
        ...action,
        color: action.color || '#00bcd4',
        onPress: () => {
          isShown = false;
          resolve();
        }
      }
    };

    if (isShown) {
      return;
    }

    Snackbar.show(options);
    isShown = true;
    setTimeout(() => {
      isShown = false;
      action && resolve();
    }, getMs(duration));
  });
};

export { LENGTH_SHORT };
export { LENGTH_LONG };
