import particle from "./lib/particle";
import FirmwareDataMapper from "./lib/FirmwareDataMapper";
import PersistentState from "./PersistentState";

// Action types
export const LOGIN_REQUEST = "login_request";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILURE = "login_failure";

export const NAVIGATE = "navigate";

export const DATA_STREAM = "data_stream";
export const DATA_RECEIVE = "data_receive";

export const CALS_FETCH = "cals_fetch";
export const CALS_RECEIVE = "cals_receive";
export const CALS_SET = "cals_set";
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
    particle.login({
      username: email,
      password: password
    }).then(function ({ body }) {
      // TODO: This doesn't belong here. Maybe a custom middleware could be used
      PersistentState.saveToken(body.access_token);
      dispatch(loginSuccessful(body.access_token));
    }, function (err) {
      dispatch(loginFailed());
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
    particle.getEventStream({ name: deviceEvent, deviceId: deviceName, auth: PersistentState.loadToken() })
      .then(function (stream) {
        // Save the XMLHttpRequest to be able to abort it later
        dispatch(dataStream(stream));

        stream.on('event', function (event) {
          let rawData = JSON.parse(event.data);
          let data = FirmwareDataMapper.variablesToApp(rawData);

          dispatch(dataReceive(data));
        });
      }, function (err) {
        dispatch(loginFailed());
      });
  };
}

export function calsFetch(group) {
  return {
    type: CALS_FETCH,
    group
  };
}

export function calsReceive(group) {
  return {
    type: CALS_RECEIVE,
    group
  };
}

export function calsSet(data) {
  return {
    type: CALS_SET,
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

    particle.getVariable({ deviceId: deviceName, name: deviceCals, auth: PersistentState.loadToken() })
    .then(function({ body }) {
      let rawData = JSON.parse(body.result);
      let data = FirmwareDataMapper.calibrationsToApp(rawData);

      dispatch(calsReceive(group));
      dispatch(calsSet(data));
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

    particle.callFunction({ deviceId: deviceName, name: "get", argument: deviceWakeupTime, auth: PersistentState.loadToken() })
    .then(function() {
      return particle.getVariable({ deviceId: deviceName, name: "result", auth: PersistentState.loadToken() });
    })
    .then(function({ body }) {
      let wakeupTime = JSON.parse(body.result);

      dispatch(calsReceive(group));
      dispatch(calsSet({wakeupTime}));
    })
    .catch(function(err) {
      dispatch(calsFailure(group));
      console.log(err);
    });
  };
}

export function setCalibration(cal, value) {
  return function(dispatch) {
    let firmwareCal = FirmwareDataMapper.calibrationFirmwareName(cal);
    let firmwareValue = FirmwareDataMapper.calibrationFirmwareValue(cal, value);

    particle.callFunction({ deviceId: deviceName, name: "set", argument: `${firmwareCal}=${firmwareValue}`, auth: PersistentState.loadToken() })
    .then(function() {
      dispatch(calsSet({ [cal]: value }));
    })
    .catch(function(err) {
      console.log(err);
    });
  };
}
