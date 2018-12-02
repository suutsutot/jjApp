// import Snackbar from 'react-native-snackbar';

export const show = ({ title, duration, action }) => {
  return new Promise(resolve => {
    let options = { title, duration };
    if (action) {
      options.action = action;
      options.action.color = action.color || '#00bcd4';
      options.action.onPress = () => resolve();
    }

    // Snackbar.show(options);
  });
};

// const { LENGTH_SHORT, LENGTH_LONG, LENGTH_INDEFINITE } = Snackbar;
const { LENGTH_SHORT, LENGTH_LONG, LENGTH_INDEFINITE } = {};

export { LENGTH_SHORT };
export { LENGTH_LONG };
export { LENGTH_INDEFINITE };
