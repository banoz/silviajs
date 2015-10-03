import { combineReducers } from "redux";
import { NAVIGATE, LOGIN_REQUEST } from "./actions";

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
        inProgress: true
      });
    /* case LOGIN_SUCCESSFUL:
    * return action.token;
    * case LOGIN_INVALID:
    * return null;
    */
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  page,
  login
});

export default rootReducer;
