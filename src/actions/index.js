import { SIGN_UP, LOG_IN, LOG_OUT, USER_UPDATE } from './type';

// set data in local storage on initial load
if (!localStorage.getItem('data')) localStorage.setItem('data', JSON.stringify([]));

export const signup = (users, user) => {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('session', JSON.stringify(true));
  return {
    type: SIGN_UP,
    payload: {
      users,
      user,
    },
  };
};

export const login = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('session', JSON.stringify(true));
  return {
    type: LOG_IN,
    payload: user,
  };
};

export const logout = () => {
  localStorage.setItem('session', JSON.stringify(false));
  localStorage.setItem('currentUser', JSON.stringify({}));
  return {
    type: LOG_OUT,
  };
};

export const updateUser = (user) => {
  return {
    type: USER_UPDATE,
    payload: user,
  };
};
