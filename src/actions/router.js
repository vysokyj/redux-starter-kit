import { push } from "react-router-redux";

export function navigate(url) {
  return dispatch => {
    dispatch(push(url));
  }
}
