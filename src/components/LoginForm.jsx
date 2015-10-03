import React, { Component, PropTypes } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    var inProgress = this.props.inProgress;
    var busyIcon = <i className="glyphicon glyphicon-hourglass"></i>;

    return (
      <div>
        <div className="header">
          <h3 className="text-muted">silvia</h3>
        </div>
        <section>
          <h2 className="text-center">Log in</h2>
          <form className="login-form" onSubmit={this.props.handleLogin}>
            <input type="email" className="form-control" name="email"
              placeholder="Particle.io email" disabled={inProgress}
              value={this.state.email} onChange={this.handleChange} />
            <input type="password" className="form-control" name="password"
              placeholder="Particle.io password" disabled={inProgress}
              value={this.state.password} onChange={this.handleChange} />
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
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
