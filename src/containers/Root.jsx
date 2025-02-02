import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./../reducers";
import App from "./App.jsx";

const store = configureStore({
  reducer: rootReducer,
});

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
