import { combineReducers } from "redux";
import { NAVIGATE,
  LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS
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

function login(state = null, action) {
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

const rootReducer = combineReducers({
  page,
  login
});

export default rootReducer;
