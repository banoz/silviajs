import Spark from "./lib/spark";

// Action types
export const LOGIN_REQUEST = "login_request";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILURE = "login_failure";

export const NAVIGATE = "navigate";

export const DATA_STREAM = "data_stream";
export const DATA_RECEIVE = "data_receive";

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
        dispatch(loginSuccessful(data.access_token));
        dispatch(navigateTo("status"));
      }
    });
  };
}

const deviceName = "silvia";
const deviceEvent = "coffee";

export function dataStream(request) {
  return {
    type: DATA_STREAM,
    request
  };
}

export function dataReceive(data) {
  return {
    type: DATA_RECEIVE,
    data
  };
}

export function subscribeToDeviceData() {
  return function(dispatch) {
    var request = Spark.getEventStream(deviceEvent, deviceName, function(event) {
      if(event instanceof Error) {
        console.log(event);
      } else {
        let rawData = JSON.parse(event.data);
        let data = {
          temperature: rawData.temp,
          power: rawData.dc,
          error: rawData.e,
          sleeping: rawData.s,
          iPart: rawData.i,
          pPart: rawData.p
        };

        dispatch(dataReceive(data));
      }
    });

    // Save the XMLHttpRequest to be able to abort it later
    dispatch(dataStream(request));
  };
}
