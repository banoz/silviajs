import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import PersistentState from "../PersistentState";
import App from "./App.jsx";

const store = configureStore(PersistentState.load());

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
