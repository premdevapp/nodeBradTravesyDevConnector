import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
} from "./types";

// get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((response) =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((response) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
