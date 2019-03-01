import types from 'src/constants/actionTypes';
import { merge } from 'ramda';

const defaultState = {
  data: {
    activities: {}
  },
  form: {
    firstName: 'Gucci',
    lastName: 'Mane',
    birthday: 'Wed Feb 20 2019 16:50:00 GMT+0300',
    gender: 'male',
    location: {
      string: 'Los Angeles, CA, USA',
      details: {
        lat: 34.0522342,
        lng: -118.2436849,
        geo: [34.0522342, -118.2436849],
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        formatted: 'Los Angeles, CA, USA',
        placeId: 'ChIJE9on3F3HwoAR9AhGJW_fL-I',
        name: 'Los Angeles'
      }
    },
    language: 'English'
  },
  activities: [
    {
      type: 'ROWING',
      name: 'Академическая гребля Rowing Rowing',
      level: 'No experience',
      interest: 'Middle'
    },
    {
      type: 'ATHLETICS',
      name: 'Атлетика Athletics Athletics',
      level: 'No experience',
      interest: 'Middle'
    }
  ]
};

export const registration = (state = defaultState, action) => {
  const { payload } = action;
  console.log({ payload });

  switch (action.type) {
    case types.REGISTRATION.CHANGE_FIELD:
      return merge(state, { form: merge(state.form, payload) });
    default:
      return state;
  }
};
