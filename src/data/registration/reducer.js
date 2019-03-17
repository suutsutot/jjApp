import types from 'src/constants/actionTypes';
import { merge, append, without, includes, uniq, concat, keys } from 'ramda';

const defaultState = {
  tabIndex: 0,
  data: {
    activities: {
      ROWING: {
        type: 'CHECKERS',
        name: 'Академическая гребля Rowing Rowing',
        level: 'No experience',
        interest: 'Middle'
      },
      ATHLETICS: {
        type: 'ATHLETICS',
        name: 'Атлетика Athletics Athletics',
        level: 'No experience',
        interest: 'Middle'
      }
    },
    languages: [{ value: 'English' }, { value: 'Norway' }, { value: 'Russian' }]
  },
  registrationForm: {
    email: '',
    password: '',
    confirmPassword: ''
  },
  personalDataForm: {
    firstName: '',
    lastName: 'Mane',
    birthday: 'Wed Feb 20 2019 16:50:00 GMT+0300',
    gender: 'male',
    location: 'Los Angeles, CA, USA',
    language: 'English'
  },
  selectedActivities: ['ROWING'],
  personalDataValidation: [],
  registrationValidation: []
};

export const registration = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.REGISTRATION.CHANGE_FIELD: {
      const validationId = {
        personalDataForm: 'personalDataValidation',
        registrationForm: 'registrationValidation'
      }[payload.formId];
      return merge(state, {
        [payload.formId]: merge(state[payload.formId], payload.fields),
        [validationId]: uniq(concat(keys(payload.fields), state[validationId]))
      });
    }
    case types.REGISTRATION.VALIDATE_FIELD: {
      const validationId = payload.validationId;
      return merge(state, {
        [validationId]: uniq(concat(payload.fields, state[validationId]))
      });
    }
    case types.REGISTRATION.CHANGE_TAB_INDEX:
      return merge(state, { tabIndex: payload });
    case types.REGISTRATION.TOGGLE_ACTIVITY:
      if (!includes(payload, state.selectedActivities)) {
        return merge(state, {
          selectedActivities: append(payload, state.selectedActivities)
        });
      } else
        return merge(state, {
          selectedActivities: without(payload, state.selectedActivities)
        });
    default:
      return state;
  }
};