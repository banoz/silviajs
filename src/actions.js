
// Action types
export const LOGIN_REQUEST = "login_request";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILURE = "login_failure";

export const NAVIGATE = "navigate";

// Action creators

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

// Asynch action to log in
// See http://rackt.github.io/redux/docs/advanced/AsyncActions.html
export function loginToParticle(email, password) {
  return function(dispatch) {
    dispatch(loginRequest());
  };
}

export function navigateTo(page) {
  return {
    type: NAVIGATE,
    page
  };
}
