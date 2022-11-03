import { SIGNUP, LOGIN_USER, LOGOUT_USER, AUTH_USER } from "./types";

import AccountService from "../../services/AccountService";
import { DELETE_ALL_SHIPMENTS } from "../shipments/types";

export const signUp = (data) => async (dispatch) => {
  try {
    const res = await AccountService.signUp(data);

    dispatch({
      type: SIGNUP,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const res = await AccountService.logIn({ email, password });

      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const logOut = () => async (dispatch) => {
  try {
    const res = await AccountService.logOut();

    dispatch({
      type: LOGOUT_USER,
      payload: res.data,
    });
    dispatch({
      type: DELETE_ALL_SHIPMENTS,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const auth = () => async (dispatch) => {
  try {
    const res = await AccountService.checkAuth();

    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
