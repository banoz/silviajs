import { combineReducers } from "redux";
import { NAVIGATE } from "./actions";

const defaultPage = "status";

function page(state = defaultPage, action) {
  switch(action.type) {
    case NAVIGATE:
      return action.page;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch(action.type) {
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
  token
});

export default rootReducer;
