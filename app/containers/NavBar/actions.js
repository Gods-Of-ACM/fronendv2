/*
 *
 * NavBar actions
 *
 */

import {
  DEFAULT_ACTION,
  LOG_IN,
  LOG_OUT,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  REGISTER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function register(username, password, firstName, lastName) {
  return {
    type: REGISTER,
    username,
    password,
    firstName,
    lastName,
  };
}

export function login(username, pwd) {
  return {
    type: LOG_IN,
    username,
    pwd,
  };
}

export function loginSuccess(token, role) {
  return {
    type: LOG_IN_SUCCESS,
    token,
    role,
  };
}

export function logginError(err) {
  return {
    type: LOG_IN_ERROR,
    err,
  };
}

export function logout() {
  return {
    type: LOG_OUT,
  };
}
