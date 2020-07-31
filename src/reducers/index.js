import {
  SIGN_UP,
  LOG_IN,
  LOG_OUT,
  USER_UPDATE,
} from '../actions/type';

const INITIAL_STATE = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
  session: JSON.parse(localStorage.getItem('session')) || false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        users: action.payload.users,
        currentUser: action.payload.user,
        session: true,
      };
    case LOG_IN:
      return { ...state, currentUser: action.payload, session: true };
    case LOG_OUT:
      return { ...state, currentUser: {}, session: false };
    case USER_UPDATE:
      const users = [...state.users];
      const index = users.findIndex((el) => el.id === state.currentUser.id);
      for (let key in users[index]) {
        if (key !== 'id') users[index][key] = action.payload[key];
      }
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[index]));
      return { ...state, users, currentUser: users[index] };
    default:
      return state;
  }
};
