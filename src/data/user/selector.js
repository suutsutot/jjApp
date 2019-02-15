import { isNil, isEmpty } from 'ramda';

export const isUserLoggedIn = state => {
  const { user } = state;
  return (
    !isNil(user.userId) &&
    !isEmpty(user.userId) &&
    !isNil(user.email) &&
    !isEmpty(user.email)
  );
};
