import Spark from "../vendor/spark/spark.js";

// Action types
export const LOGIN_REQUEST = "login_request";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILURE = "login_failure";

export const NAVIGATE = "navigate";

// Action creators

export function navigateTo(page) {
  return {
    type: NAVIGATE,
    page
  };
}
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginFailed() {
  return {
    type: LOGIN_FAILURE
  };
}

export function loginSuccessful(token) {
  return {
    type: LOGIN_SUCCESS,
    token
  };
}

// Asynch action to log in
// See http://rackt.github.io/redux/docs/advanced/AsyncActions.html
export function loginToParticle(email, password) {
  return function(dispatch) {
    dispatch(loginRequest());
    Spark.login({
      username: email,
      password: password
    }, function(err, data) {
      if(err) {
        dispatch(loginFailed());
      } else {
        dispatch(loginSuccessful(data.accessToken));
        dispatch(navigateTo("status"));
      }
    });
  };
}
