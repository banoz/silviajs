import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Login from "../containers/Login.jsx";
import Main from "../containers/Main.jsx";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="wrap">
          {this.renderPage()}
        </div>
      </div>
    );
  }

  renderPage() {
    switch(this.props.page) {
      case "login":
        return (
          <Login />
        );
      default:
        return (
          <Main />
        );
    }
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired
};

function select(state) {
  return {
    page: state.page
  };
}

export default connect(select)(App);
