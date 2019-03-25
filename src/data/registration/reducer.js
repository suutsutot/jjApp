import types from 'src/constants/actionTypes';
import {
  mergeRight,
  append,
  without,
  includes,
  uniq,
  concat,
  keys
} from 'ramda';

const defaultState = {
  tabIndex: 0,
  userInfo: null,
  loading: false,
  error: '',
  registrationForm: {
    email: '',
    password: '',
    confirmPassword: ''
  },
  personalDataForm: {
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    location: '',
    language: ''
  },
  data: {
    activities: [],
    languages: [{ value: 'English' }, { value: 'Norway' }, { value: 'Russian' }]
  },
  selectedActivities: [],
  personalDataValidation: [],
  registrationValidation: []
};

export const registration = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.REGISTRATION.CREDENTIALS_INFO: {
      return mergeRight(state, { userInfo: payload });
    }
    case types.REGISTRATION.FETCH_ACTIVITIES_REQUEST: {
      return mergeRight(state, { loading: true });
    }
    case types.REGISTRATION.FETCH_ACTIVITIES_SUCESS: {
      return mergeRight(state, {
        data: mergeRight(state.data, { activities: payload }),
        loading: false
      });
    }
    case types.REGISTRATION.FETCH_ACTIVITIES_ERROR: {
      return mergeRight(state, { error: payload, loading: false });
    }
    case types.REGISTRATION.CHANGE_FIELD: {
      const validationId = {
        personalDataForm: 'personalDataValidation',
        registrationForm: 'registrationValidation'
      }[payload.formId];
      return mergeRight(state, {
        [payload.formId]: mergeRight(state[payload.formId], payload.fields),
        [validationId]: uniq(concat(keys(payload.fields), state[validationId]))
      });
    }
    case types.REGISTRATION.VALIDATE_FIELD: {
      const validationId = payload.validationId;
      return mergeRight(state, {
        [validationId]: uniq(concat(payload.fields, state[validationId]))
      });
    }
    case types.REGISTRATION.CHANGE_TAB_INDEX:
      return mergeRight(state, { tabIndex: payload });
    case types.REGISTRATION.TOGGLE_ACTIVITY:
      if (!includes(payload, state.selectedActivities)) {
        return mergeRight(state, {
          selectedActivities: append(payload, state.selectedActivities)
        });
      } else
        return mergeRight(state, {
          selectedActivities: without(payload, state.selectedActivities)
        });
    default:
      return state;
  }
};

//1 валидация по кнопке некст 
//2 смена табы при успешном реквесте и подгрузка активностей
//3 переводы активностей
//4 картинки активностей найти какие не загрузились
//5 сделать отправку формы второй табы
//6 добавить валидацию которой не хватает
//7 добавить 4 экшена при реквесте профиль формы
