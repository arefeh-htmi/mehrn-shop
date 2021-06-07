/*
 * Authentication actions
 */

import { SET_AUTH, CLEAR_AUTH } from "../constants/authnticationConstants.js";

const setAuth = () => {
  return {
    type: SET_AUTH,
  };
};

const clearAuth = () => {
  return {
    type: CLEAR_AUTH,
  };
};
export { setAuth, clearAuth };
