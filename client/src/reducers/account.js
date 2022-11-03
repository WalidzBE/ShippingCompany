import {
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP,
} from "../actions/account/types";

const initialState = {};

const shipmentReducer = (account = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER:
    case SIGNUP:
    case AUTH_USER:
      return payload;

    case LOGOUT_USER:
      return {};

    default:
      return account;
  }
};

export default shipmentReducer;
