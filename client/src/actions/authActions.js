import axios from "axios";
import { GET_ERRORS } from "./types";
// Register
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((result) => {
      console.log(result.data);
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
