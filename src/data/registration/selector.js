import { isNil, isEmpty } from 'ramda';

export const isFieldNotValid = value => isNil(value) || isEmpty(value);
