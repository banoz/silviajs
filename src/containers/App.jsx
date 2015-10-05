import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Login from "../containers/Login.jsx";
import Main from "../containers/Main.jsx";
import { loginWithToken } from "../actions";

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

  componentWillMount() {
    this.applyToken();
  }

  componentWillReceiveProps(nextProps) {
    this.applyToken();
  }

  applyToken() {
    if(this.props.token) {
      this.props.dispatch(loginWithToken(this.props.token));
    }
  }

  renderPage() {
    if(this.props.token) {
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
