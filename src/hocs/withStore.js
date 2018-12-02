import React from 'react';

export default (store, Provider) => (WrappedComponent) => (props) => (
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
);
