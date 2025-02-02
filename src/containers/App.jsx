import React, { Component } from "react";
import PropTypes from "prop-types";
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
    if (this.props.token) {
      return <Main />;
    }
    return <Login />;
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string
};

function select(state) {
  return {
    token: state.login.token
  };
}

export default connect(select)(App);
