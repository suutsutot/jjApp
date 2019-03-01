import types from 'src/constants/actionTypes';
import { merge } from 'ramda';



const defaultState = {
  tabIndex: 0,
  data: {
    activities: {},
    languages: ["eanglish", 'norway', 'russia']
  },
  form: {
    firstName: 'Gucci',
    lastName: 'Mane',
    birthday: 'Wed Feb 20 2019 16:50:00 GMT+0300',
    gender: 'male',
    location: 'Los Angeles, CA, USA',
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
