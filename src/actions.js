import Spark from "./lib/spark";

// Action types
export const LOGIN_REQUEST = "login_request";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILURE = "login_failure";

export const NAVIGATE = "navigate";

export const DATA_STREAM = "data_stream";
export const DATA_RECEIVE = "data_receive";

export const CALS_FETCH = "cals_fetch";
export const CALS_RECEIVE = "cals_receive";
export const CALS_FAILURE = "cals_failure";

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
const deviceCals = "cals";
const deviceWakeupTime = "Twakeup";

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
          sleeping: rawData.s === 1,
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

export function calsFetch(group) {
  return {
    type: CALS_FETCH,
    group
  };
}

export function calsReceive(group, data) {
  return {
    type: CALS_RECEIVE,
    group,
    data
  };
}

export function calsFailure(group) {
  return {
    type: CALS_FAILURE,
    group
  };
}

export function fetchCalibrations() {
  return function(dispatch) {
    let group = "mainCals";

    dispatch(calsFetch(group));

    Spark.getVariable(deviceName, deviceCals)
    .then(function(payload) {
      let rawData = JSON.parse(payload.result);
      let data = {
        targetTemperature: rawData.sp,
        proportional: rawData.Kp,
        integral: rawData.Ki,
        offset: rawData.Ko
      };

      dispatch(calsReceive(group, data));
    })
    .catch(function(err) {
      dispatch(calsFailure(group));
      console.log(err);
    });
  };
}

export function fetchWakeupTime() {
  return function(dispatch) {
    let group = "sleepCals";

    dispatch(calsFetch(group));

    Spark.callFunction(deviceName, "get", deviceWakeupTime)
    .then(function() {
      return Spark.getVariable(deviceWakeupTime, "result");
    })
    .then(function(payload) {
      let wakeupTime = JSON.parse(payload);

      dispatch(calsReceive(group, {wakeupTime}));
    })
    .catch(function(err) {
      dispatch(calsFailure(group));
      console.log(err);
    });
  };
}
