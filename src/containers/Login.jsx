import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm.jsx";
import { loginToParticle } from "../actions";

class Login extends Component {
  handleLogin(email, password) {
    this.props.dispatch(
      loginToParticle(email, password)
    );
  }

  render() {
    return (
      <LoginForm handleLogin={this.handleLogin.bind(this)}
        inProgress={this.props.login.inProgress}
        failed={this.props.login.failed} />
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

function select(state) {
  return {
    login: state.login
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Login);

