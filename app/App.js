import React, { Fragment } from 'react';
import {Provider} from 'react-redux';

import store from 'app/store/index';
import SocketController from 'app/components/SocketController';
import PushNotificationsController from 'app/components/PushNotificationsController';
import Master from 'app/components/Master';

const Application = () => (
  <Provider store={store}>
    <Fragment>
      <Master />
  
      <SocketController />
      <PushNotificationsController />
    </Fragment>
  </Provider>
);

export default Application;
