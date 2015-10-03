import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header.jsx";
import Footer from "../components/Footer.jsx";
import Status from "../components/Status.jsx";
import Calibrate from "../components/Calibrate.jsx";
import Sleep from "../components/Sleep.jsx";
import Login from "../containers/Login.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="wrap">
          {this.renderLayout(this.renderPage())}
        </div>
      </div>
    );
  }

  renderLayout(page) {
    if(this.props.page !== "login") {
      return (
        <div>
          <Header />
          {page}
          <Footer />
        </div>
      );
    }
    return page;
  }

  renderPage() {
    switch(this.props.page) {
      case "status":
        return (
          <Status temperature={80} power={10} />
        );
      case "calibrate":
        return (
          <div>
            <Status temperature={80} power={10} />
            <Calibrate temperature={80} power={10} error={10} targetTemperature={96}
              offset={4} proportional={10} integral={0.1} iPart={8.5} />
          </div>
        );
      case "sleep":
        return (
          <div>
            <Status temperature={80} power={10} />
            <Sleep wakeTime={new Date(2015, 10, 2, 6, 50).getTime()} />
          </div>
        );
      case "login":
        return (
          <Login />
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
