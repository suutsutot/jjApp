import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const navigationListener = createReduxBoundAddListener("root");

export { navigationMiddleware, navigationListener };
