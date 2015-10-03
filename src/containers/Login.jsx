import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm.jsx";
import { loginToParticle } from "../actions";

class Login extends Component {
  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(
      loginToParticle(event.target.email, event.target.password)
    );
  }

  render() {
    return (
      <LoginForm handleLogin={this.handleLogin.bind(this)}
        inProgress={this.props.login.inProgress} />
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.node.isRequired
};

function select(state) {
  return {
    login: state.login
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Login);

