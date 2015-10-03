import React, { Component } from "react";
import { loginToParticle } from "../actions";
import { dispatch } from "redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.doLogin = this.doLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  doLogin() {
    dispatch(loginToParticle(
      this.state.email,
      this.state.password
    ));
  }

  handleChange(event) {
    var newState = {};

    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <div className="header">
          <h3 className="text-muted">silvia</h3>
        </div>
        <section>
          <h2 className="text-center">Log in</h2>
          <form className="login-form" onSubmit={this.doLogin}>
            <input type="email" className="form-control" name="email" placeholder="Particle.io email"
              value={this.state.email} onChange={this.handleChange} />
            <input type="password" className="form-control" name="password" placeholder="Particle.io password"
              value={this.state.password} onChange={this.handleChange} />
            <input type="submit" value="Log in" className="btn btn-warning btn-block" />
          </form>
        </section>
      </div>
    );
  }
}

export default Login;
