import { combineReducers } from "redux";
import PersistentState from "./PersistentState";
import { NAVIGATE,
  LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
  DATA_STREAM, DATA_RECEIVE,
  CALS_FETCH, CALS_RECEIVE, CALS_FAILURE
} from "./actions";

const defaultPage = "login";

function page(state = defaultPage, action) {
  switch(action.type) {
    case NAVIGATE:
      return action.page;
    default:
      return state;
  }
}

const defaultLogin = Object.assign({},
  PersistentState.load(), {
    inProgress: false,
    failed: false
  }
);

function login(state = defaultLogin, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        inProgress: true,
        failed: false
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        inProgress: false,
        failed: true
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
  switch(action.type) {
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

const defaultCals = {
  state: {
    mainCals: "not loaded",
    sleepCals: "not loaded"
  },
  data: {
    targetTemperature: null,
    proportional: null,
    integral: null,
    offset: null,
    wakeupTime: null
  }
};

function calibrations(state = defaultCals, action) {
  switch(action.type) {
    case CALS_FETCH:
      return Object.assign({}, state, {
        state: {
          [action.group]: "fetching"
        }
      });
    case CALS_FAILURE:
      return Object.assign({}, state, {
        state: {
          [action.group]: "not loaded"
        }
      });
    case CALS_RECEIVE:
      return Object.assign({}, state, {
        state: {
          [action.group]: "loaded"
        },
        data: Object.assign({}, state.data, action.data)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  page,
  login,
  variables,
  calibrations
});

export default rootReducer;
