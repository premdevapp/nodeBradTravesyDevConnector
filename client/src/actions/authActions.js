import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../util/setAuthToken";
// Register
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((result) => {
      return history.push("/login");
    })
    .catch((error) => {
      console.log(error.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Login
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((result) => {
      // save to localstorage
      const { token } = result.data;
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      // decode token
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      console.log(error.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// logout
export const logoutUser = () => (dispatch) => {
  // remove token from localstorage
  localStorage.removeItem("jwtToken");
  // remove auth header
  setAuthToken(false);
  // set current user to empty object
  dispatch(setCurrentUser({}));
};

// setCurrentUser
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
