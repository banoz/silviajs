import React from "react";
import PropTypes from "prop-types";
import PureComponent from "./PureComponent";

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.handleLogin(this.state.email, this.state.password);
  }

  render() {
    var inProgress = this.props.inProgress;
    var busyIcon = <i className="glyphicon glyphicon-hourglass"></i>;
    var failureMessage = this.props.failed ?
      <div className="error">Invalid email or password</div> : "";
    var fieldProps = {
      className: "form-control",
      disabled: inProgress,
      required: true,
      onChange: this.handleChange.bind(this)
    };

    return (
      <div>
        <div className="header">
          <h3 className="text-muted">silvia</h3>
        </div>
        <section>
          <h2 className="text-center">Log in</h2>
          <form className="login-form" onSubmit={this.handleLogin.bind(this)}>
            <input type="email" name="email" value={this.state.email}
              placeholder="Particle.io email" {...fieldProps} />
            <input type="password" name="password" value={this.state.password}
              placeholder="Particle.io password" {...fieldProps} />
            {failureMessage}
            <button type="submit" className="btn btn-warning btn-block"
              disabled={inProgress}>
              {inProgress ? busyIcon : "Log in"}
            </button>
          </form>
        </section>
      </div>
    );
  }
}

LoginForm.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
