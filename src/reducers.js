import { combineReducers } from "redux";
import PersistentState from "./PersistentState";
import {
  NAVIGATE,
  LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
  DATA_STREAM, DATA_RECEIVE,
  CALS_FETCH, CALS_RECEIVE, CALS_SET, CALS_FAILURE
} from "./actions";

const defaultPage = "status";

function page(state = defaultPage, action) {
  switch (action.type) {
    case NAVIGATE:
      return action.page;
    default:
      return state;
  }
}

const defaultLogin = {
  inProgress: false,
  failed: false,
  token: PersistentState.loadToken()
};

function login(state = defaultLogin, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        inProgress: true,
        failed: false
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        inProgress: false,
        failed: true,
        token: null
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        inProgress: false,
        failed: false,
        token: action.token
      });
    default:
      return state;
  }
}

const defaultVariables = {
  request: null,
  data: {
    temperature: null,
    power: null,
    error: null,
    sleep: null,
    iPart: null,
    pPart: null
  }
};

function variables(state = defaultVariables, action) {
  switch (action.type) {
    case DATA_STREAM:
      return Object.assign({}, state, {
        request: action.request
      });
    case DATA_RECEIVE:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}

const defaultCalsState = {
  mainCals: "not loaded",
  sleepCals: "not loaded"
};

function calibrationState(state = defaultCalsState, action) {
  switch (action.type) {
    case CALS_FETCH:
    case CALS_FAILURE:
    case CALS_RECEIVE:
      let loadingState = {
        [CALS_FETCH]: "fetching",
        [CALS_FAILURE]: "not loaded",
        [CALS_RECEIVE]: "loaded"
      };

      return Object.assign({}, state, {
        [action.group]: loadingState[action.type]
      });
    default:
      return state;
  }
}

const defaultCalsData = {
  targetTemperature: null,
  proportional: null,
  integral: null,
  offset: null,
  wakeupTime: null
};

function calibrationsData(state = defaultCalsData, action) {
  switch (action.type) {
    case CALS_SET:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

const calibrations = combineReducers({
  state: calibrationState,
  data: calibrationsData
});

const rootReducer = combineReducers({
  page,
  login,
  variables,
  calibrations
});

export default rootReducer;
